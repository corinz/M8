<script lang="ts">
    import {Input} from '@smui/textfield';
    import Paper from '@smui/paper';
    import JsonTable from "./JsonTable.svelte";
    // import Fuse from 'fuse.js'
    import {onMount} from 'svelte';
    import {defaultFocus} from "./focus"
    import {queryStore, gql, getContextClient} from '@urql/svelte';

    export let searchEventKey: string;
    let numResults: number = 0
    // $: numResults = null  TODO: deprecated tables
    let errorMessage: string = "";
    let debug = false;

    const debounceDelay: number = 1000
    // Default view
    let searchBarInput: string = "Deployment"
    onMount(async () => search())
    const filterOptions = {
        keys: ['name'],
        threshold: 0.40 // 0 = perfect match, 1 = indiscriminate
    }

    // Graphql Client and queries
    const client = getContextClient()
    const apiResourcesQuery = gql`query RootQuery {
          apiResources {
            APIResources {
              Kind
              Name
              ShortNames
            }}}`
    const resourcesQuery = gql`query RootQuery($name: String) {
          resources(name: $name) {
            ObjectMeta {
              Name
              Namespace
            }
            TypeMeta {
              APIVersion
              Kind
            }}}`

    let qStore //OperationResultStore<any, { [p: string]: any } | void> & Pausable;
    let query = apiResourcesQuery
    let queryVars = {}
    $: qStore = queryStore({
        client,
        query,
        variables: queryVars
    })

    if (debug) {
        client.subscribeToDebugTarget(event => {
            if (event.source === 'cacheExchange')
                return;
            console.log("GQL: ", event);
        });
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
            query = apiResourcesQuery
            queryVars = {}
        } else if (searchBarInput !== "") {
            const name = searchBarInput
            queryVars = {name}
            query = resourcesQuery
        }
        // Clear search bar and reset focus after search
        searchBarInput = ""

        // defaultFocus if query was successful
        if($qStore.data["resources"].entries == 0 ) {
            defaultFocus()
        }
    }

    // function filter(): void {
    //     if (searchBarInput == "") { // if empty search, empty filter
    //         filteredTableObject = []
    //         numResults = tableObject.length
    //     } else {
    //         console.log("Filtering: ", searchBarInput)
    //         const fuse = new Fuse(tableObject, filterOptions)
    //         let filteredTableObjectMap = fuse.search(searchBarInput)
    //         filteredTableObject = filteredTableObjectMap.map((idx) => idx.item)
    //         numResults = filteredTableObject.length
    //     }
    // }

    // Handles dyanmic input
    function handleInput(): void {
        if (searchEventKey === ':') {
            search()
        } else if (searchEventKey === '/') {
            // TODO: filter is broken
            // filter()
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

    // flattens the object by moving children keys to the top level
    function flattenResourceObj(data) {
        if (!data || (Array.isArray(data) && !data.length) ){
            return []
        }
        let obj = []
        data.forEach( entry => {
            const {ObjectMeta, TypeMeta, ...rest } = entry
            obj.push({...ObjectMeta, ...TypeMeta, ...rest })
        })
        return obj
    }
</script>

<div style="padding: 10px 0">
    <Paper class="solo-paper" elevation={6}>
        <Input
                id="search"
                bind:value={searchBarInput}
                on:keydown={handleKeyDown}
                on:input={debounce(handleInput, debounceDelay)}
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

{#if $qStore.fetching}
    <p>Fetching...</p>
{:else if $qStore.error}
    <p>Error: {$qStore.error.message}</p>
{:else if !$qStore.data["resources"]}
    <p>Empty dataset</p>
{:else}
    <div class="scroll">
        <JsonTable data={flattenResourceObj($qStore.data["resources"])}/>
    </div>
{/if}

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