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

    onMount(async () => tableObject = await AppGetApiResources().then(result => result))

    const filterOptions = {
        keys: ['name']
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
        AppGetApiResourcesByName(searchBarInput).then(r => {
            if (r.name == null || r.name == "") {
                console.error("API Resources not found")
            } else {
                tableObject = [r]
                numResults = tableObject.length
            }
        })
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

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        if (event.key === 'Enter') {
            search();
        }
    }
</script>

<div class="solo-demo-container solo-container">
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
    </Paper>
</div>

<div>
    {numResults} results
</div>

{#if filteredTableObject.length !== 0 }
    <JsonTable data={filteredTableObject}/>
{:else}
    <JsonTable data={tableObject}/>
{/if}

<style>
    .solo-demo-container {
        padding: 36px 18px;
        background-color: var(--mdc-theme-background, #f8f8f8);
        border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    }

    .solo-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    * :global(.solo-paper) {
        display: flex;
        align-items: center;
        flex-grow: 1;
        max-width: 600px;
        margin: 0 12px;
        padding: 0 12px;
        height: 48px;
    }

    * :global(.solo-paper > *) {
        display: inline-block;
        margin: 0 12px;
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
</style>