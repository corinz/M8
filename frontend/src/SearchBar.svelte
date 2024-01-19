<script lang="ts">
    import {Input} from '@smui/textfield';
    import Paper from '@smui/paper';
    import Fuse from 'fuse.js'
    import {defaultFocus, focusedElement} from "./focus"
    import _ from 'underscore';
    import {GqlResourceQuery} from "./resourceQuery.ts"
    import {activeContextStore, allContextStore} from "./activeContextStore";
    import {dataStore} from "./jsonTable";

    // search and filter and ui
    export let searchEventKey: string
    let searchBarInput: string = "" // TODO: if the first search is broken, others are broken too
    let placeholder
    const filterOptions = {
        keys: ['name', 'Name', 'namespace', 'Namespace'],
        threshold: 0.40 // 0 = perfect match, 1 = indiscriminate
    }
    $: debounceDelay = searchEventKey === '/' ? 600 : 850
    $: debouncedHandleInput = _.debounce(handleInput, debounceDelay)
    // $: tableObject ? defaultFocus() : focusedElement.set(document.getElementById("search"))

    // Graphql
    let queryVars = {"name": "pod"}
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
        } else { //display contexts
            tableObject = $allContextStore ? $allContextStore.map(r => {
                return {"Available Contexts": r}
            }) : [{"": "Fetching..."}]
        }
    }

    function search(): void {
        // Don't search blank input
        if (searchBarInput !== "") {
            const name = searchBarInput
            queryVars = {name}
        }
        // Clear search bar and reset focus after search
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
        dataStore.set(tableObject)
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

<style>
    .scroll {
        /*TODO: this setting enables horizontal scrolling for the table */
        /*but disables the sticky header*/
        overflow-x: auto;
    }
</style>