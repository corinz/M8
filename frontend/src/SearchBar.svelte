<script lang="ts">
    import {Input} from '@smui/textfield';
    import Paper from '@smui/paper';
    import {AppGetApiResources, AppGetResourceByName} from "../wailsjs/go/main/App";
    import {v1} from "../wailsjs/go/models";
    import JsonTable from "./JsonTable.svelte";
    import Fuse from 'fuse.js'
    import {onMount} from 'svelte';
    import {defaultFocus} from "./focus"

    export let searchEventKey: string;
    let searchBarInput: string = "apis"
    let namespace: string = ""
    let tableObject = []
    let numResults: number = 0
    $: numResults = tableObject.length
    let filteredTableObject = []
    let errorMessage: string = "";

    interface api {
        name: string;
        singularName: string;
        namespaced: boolean;
        kind: string;
        verbs: string[];
        shortNames?: string[];
        categories?: string[];
    }
    const blankAPI: api = {
        categories: [],
        kind: "",
        name: "",
        namespaced: false,
        shortNames: [],
        singularName: "",
        verbs: []
    }

    class kind {
        name: string = ''
        namespace: string = ''
        kind: string = ''
        ip: string = ''
        phase: string = ''
    }

    function kindListDestructure(unstructuredObject): kind[] {
        let list: kind[]
        // destructure into a kind object
        if( unstructuredObject.length > 0 ) {
            list = []
            Object.entries(unstructuredObject).forEach(objArr => {
                const obj = objArr[1] // unstructured kube object
                const k = {
                    name: obj["metadata"]["name"],
                    namespace: obj["metadata"]["namespace"],
                    kind: obj["kind"],
                    //ip: obj["status"]["podIP"],
                    //phase: obj["status"]["phase"]
                } as kind
                list.push(k)
            })
        } else {
            //empty kind obj array to preserve downstream views
            list = [new kind()]
        }
        return list
    }

    function apiListDestructure(a: v1.APIResource | v1.APIResource[]): api[] {
        let list: api[] = []
        Object.entries(a).forEach(([, obj]) => {
            // all keys of interface must be non-null, in case we use obj for table head row keys
            Object.keys(blankAPI).forEach( key => {
                obj[key] = obj[key] ?? ""
            })
            list.push(obj as api)
        })
        return list
    }

    // Default view
    onMount(async () => search())

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
        if (searchBarInput === "apis") {
            AppGetApiResources().then(r => {
                tableObject = apiListDestructure(r)
                numResults = tableObject.length
                errorMessage = ""
            })
        } else if (searchBarInput !== "") {
            AppGetResourceByName(searchBarInput, namespace).then(rList => {
                if (!rList) {
                    errorMessage = "Resource not found"
                } else {
                    tableObject = kindListDestructure(rList)
                    numResults = tableObject.length
                    errorMessage = ""
                }
            })
        }
        // Clear search bar and reset focus after search
        searchBarInput = ""
        defaultFocus()
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

    // Handles dyanmic input
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
            // prevent the next element (table) from receiving this event
            event.preventDefault()
            handleInput()
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
                autocomplete="off"
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