<script lang="ts">
    import Fuse from 'fuse.js'
    import {focusedElement} from "./focus"
    import _ from 'underscore';
    import {GqlResourceQuery} from "./resourceQuery.ts"
    import {activeContextStore} from "./activeContextStore";
    import {tableDataStore, searchTerm} from "./jsonTable";

    // search and filter and ui
    export let searchEventKey: string
    let searchBarInput: string = ""
    let placeholder
    const filterOptions = {
        keys: ['name', 'Name', 'namespace', 'Namespace'],
        threshold: 0.40 // 0 = perfect match, 1 = indiscriminate
    }
    $: debounceDelay = searchEventKey === '/' ? 600 : 850
    $: debouncedHandleInput = _.debounce(handleInput, debounceDelay)
    focusedElement.set(document.getElementById("search"))

    // Graphql
    let queryVars = {"name": "pod"}
    searchTerm.set("pod") // sets the legend title
    let getResources = new GqlResourceQuery
    let filteredTableObject = null

    // display logic
    let resourceQStore, tableObject, queryError, queryFetching, activeContextsArr
    $: numResults = tableObject == null ? 0 : tableObject.length
    $: if ($activeContextStore) {
        // Convert array (map is used by Legend.svelte for ease)
        activeContextsArr = [...$activeContextStore.keys()]
        if (activeContextsArr.length > 0) {
            resourceQStore = getResources.executeQuery(activeContextsArr, queryVars)

            // update the UI w/ proper messaging
            queryFetching = $resourceQStore.fetching
            queryError = $resourceQStore.error

            if (queryError) {
                console.log(queryError.message)
            } else if (filteredTableObject) { // filter takes precedence
                tableObject = filteredTableObject
            } else {
                // resourceQStore is not guaranteed to have completed here
                tableObject = $resourceQStore.data ? getResources.transform($resourceQStore.data) : null
            }
        } else { // default is empty table
            tableObject = []
        }
    }

    function search(): void {
        // Don't search blank input
        if (searchBarInput !== "") {
            const name = searchBarInput
            queryVars = {name}

            // sets the legend title
            searchTerm.set(searchBarInput)
        }
        // Clear search bar
        searchBarInput = ""
    }

    function filter(): void {
        if (searchBarInput == "") {
            filteredTableObject = null
        } else {
            const fuse = new Fuse(tableObject, filterOptions)
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

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        if (event.key === 'Enter') {
            // cancel debounce
            debouncedHandleInput.cancel()
            event.preventDefault()
            handleInput()
        } else if (event.key === '/' || event.key === ':') {
            searchEventKey = event.key
            event.preventDefault() // preventDefault to ignore it from input box
            focusedElement.set(document.getElementById('search'))
        } else if (event.key === "Escape") {
            // TODO
        }
    }

    window.addEventListener("keydown", function (e) {
        handleKeyDown(e)
    }, false);

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

    $: if (!queryFetching && !queryError) {
        // set store with fetched data
        tableDataStore.set(tableObject)
    }
</script>

<div class="sticky">
    <fieldset>
        <legend>Search</legend>
        <input
                id="search"
                bind:value={searchBarInput}
                on:input={debouncedHandleInput}
                placeholder={placeholder}
                type="text"
                autocomplete="off"
        />
        {numResults} results
    </fieldset>
</div>

<style>
    fieldset {
        width: 400px;
        white-space: nowrap;
        overflow: hidden;
        background-color: rgba(31, 31, 31, 1);
    }


    div.sticky {
        width: 430px;
        position: sticky;
        top: 0;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    input {
        width: 300px;
        height: 8px;
        border: none;
        border-right: 1px solid #000000;
        outline: none;
    }
</style>