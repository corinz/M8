<script lang="ts">
    import {Input} from '@smui/textfield';
    import Paper from '@smui/paper';
    import JsonTable from "./JsonTable.svelte";
    import Fuse from 'fuse.js'
    import {onMount} from 'svelte';
    import {defaultFocus, focusedElement} from "./focus"
    import {queryStore, getContextClient, gql} from '@urql/svelte';
    import _ from 'underscore';
    import {flattenResourceObj} from "./utils"
    import {GqlResourceQuery} from "./resourceQuery.ts"

    const resourceQuery = gql`query RootQuery($name: String) {
      resources(name: $name) {
        kind
        apiVersion
        metadata {
          namespace
          name
          labels
          annotations
        }
      }
    }`

    // Defaults
    export let searchEventKey: string;
    let debug = false;
    let searchBarInput: string = "deployment" // TODO: if the first search is broken, others are broken too
    onMount(async () => search())
    const filterOptions = {
        keys: ['name', 'Name'],
        threshold: 0.40 // 0 = perfect match, 1 = indiscriminate
    }

    // debounce
    $: debounceDelay = searchEventKey === '/' ? 600 : 850
    $: debouncedHandleInput = _.debounce(handleInput, debounceDelay)

    // Graphql Client and queries
    const client = getContextClient()
    let query = resourceQuery
    let queryVars = {} // TODO: should be populated with something by default to prevent first gql client search being empty

    let getResources = new GqlResourceQuery
    $: resourcesQStore = getResources.executeQuery(queryVars)
    $: resourcesData = $resourcesQStore.data ? getResources.transform($resourcesQStore.data) : {}

    // query store and tables
    let filteredTableObject = null
    $: tableObject = filteredTableObject ?? resourcesData
    $: numResults = tableObject == null ? 0 : tableObject.length
    $: queryError = $resourcesQStore.error
    $: queryFetching = $resourcesQStore.fetching

    // focus on searchbar if null, else defaultFocus
    $: !tableObject ? focusedElement.set(document.getElementById("search")) : defaultFocus()

    if (debug) {
        client.subscribeToDebugTarget(event => {
            if (event.source === 'cacheExchange')
                return;
            console.log("GQL: ", event);
        });
    }

    function search(): void {
        // Don't search blank input
        if (searchBarInput !== "") {
            const name = searchBarInput
            queryVars = {name}
            query = resourceQuery
        }
        // Clear search bar and reset focus after search
        searchBarInput = ""
    }

    function filter(): void {
        if (searchBarInput == "") {
            filteredTableObject = null
        } else {
            const fuse = new Fuse(flattenResourceObj(resourcesData), filterOptions)
            let filteredTableObjectMap = fuse.search(searchBarInput)
            filteredTableObject = filteredTableObjectMap.map((idx) => idx.item)
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
            // cancel debounce
            debouncedHandleInput.cancel()
            event.preventDefault() // prevents "enter" action
            handleInput()
        }
    }

    let placeholder
    $: switch (searchEventKey) {
        case "/":
            placeholder = "filter"
            break
        case ":":
            placeholder = "search"
            break
        default:
            placeholder = "Press : to search or / to filter"
    }
</script>

<div style="padding: 10px 0">
    <Paper class="solo-paper" elevation={6}>
        <Input
                id="search"
                bind:value={searchBarInput}
                on:keydown={handleKeyDown}
                on:input={debouncedHandleInput}
                placeholder={placeholder}
                class="solo-input"
                type="text"
                autocomplete="off"
        />
        {numResults}
    </Paper>
</div>

{#if queryFetching}
    <p>Fetching...</p>
{:else if queryError}
    <p>Error: {queryError.message}</p>
{:else if !tableObject}
    <p>Empty dataset</p>
{:else}
    <div class="scroll">
        <JsonTable data={flattenResourceObj(tableObject)}/>
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