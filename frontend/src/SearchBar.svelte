<script lang="ts">
    import {Input} from '@smui/textfield';
    import Paper from '@smui/paper';
    import {AppGetApiResources, AppGetApiResourcesByName} from "../wailsjs/go/main/App";
    import {v1} from "../wailsjs/go/models";
    import JsonTable from "./JsonTable.svelte";
    import Fuse from 'fuse.js'
    import {onMount} from 'svelte';

    export let searchEventKey: string;
    let searchBarInput: string
    let tableObject: v1.APIResource[] = [];
    let numResults: number = 0
    $: numResults = tableObject.length
    let filteredTableObject = []
    let errorMessage: string = "";

    onMount(async () => tableObject = await AppGetApiResources().then(result => result))

    const filterOptions = {
        keys: ['name'],
        threshold: 0.40 // 0 = perfect match, 1 = indiscriminate
    }

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    function search(): void {
        // Don't search blank input
        if (searchBarInput !== "") {
            AppGetApiResourcesByName(searchBarInput).then(r => {
                if (r.name == null || r.name == "") {
                    errorMessage = "Resource not found"
                } else {
                    tableObject = [r]
                    numResults = tableObject.length
                    errorMessage = ""
                }
            })
        }
        // Clear search bar value after search
        searchBarInput = ""
    }

    function filter(): void {
        if (searchBarInput == "") { // if empty search, empty filter
            filteredTableObject = []
            numResults = tableObject.length
        } else {
            console.log("Filtering: ", searchBarInput)
            const fuse = new Fuse(tableObject, filterOptions)
            let filteredTableObjectMap = fuse.search(searchBarInput)
            filteredTableObject = filteredTableObjectMap.map((idx) => idx.item)
            numResults = filteredTableObject.length
        }
    }

    function handleInput(): void {
        if (searchEventKey === ':') {
            search()
        } else if (searchEventKey === '/') {
            filter()
        }
    }

    // Handles "Enter" button when focused on search bar
    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        if (event.key === 'Enter') {
            if (searchEventKey === ':') {
                search()
            } else if (searchEventKey === '/') {
                filter()
            }
        }
    }
</script>

<div style="padding: 10px 0">
    <Paper class="solo-paper" elevation={6}>
        <Input
                id="search"
                bind:value={searchBarInput}
                on:keydown={handleKeyDown}
                on:input={debounce(handleInput, 750)}
                placeholder="Press : to search or / to filter"
                class="solo-input"
                type="text"
        />
        {numResults}
    </Paper>
    <div style="padding: 20px 0; color: red">
    {errorMessage}
    </div>
</div>

<div class="scroll">
{#if filteredTableObject.length !== 0 }
    <JsonTable data={filteredTableObject}/>
{:else}
    <JsonTable data={tableObject}/>
{/if}
</div>

<style>
    * :global(.solo-paper) {
        display: flex;
        align-items: center;
        flex-grow: 1;
        max-width: 500px;
        margin: 0 0px;
        padding: 0 12px;
        height: 36px;

    }

    * :global(.solo-paper > *) {
        display: inline-block;
        margin: 0 6px;
    }

    * :global(.solo-input) {
        flex-grow: 1;
        color: var(--mdc-theme-on-surface, #000);
    }

    * :global(.solo-input::placeholder) {
        color: var(--mdc-theme-on-surface, #000);
        opacity: 0.6;
    }

    * :global(.solo-fab) {
        flex-shrink: 0;
    }

    .scroll {
        /*TODO: this setting enables horizontal scrolling for the table */
        /*but disables the sticky header*/
        overflow-x: auto;
    }
</style>