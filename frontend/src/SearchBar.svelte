<script lang="ts">
    import {focusedElement} from "./focus"
    import _ from 'underscore';
    import {activeContextStore, execActiveContexts} from "./activeContextStore";
    import {tableDataStore, searchTerm, filterTerm} from "./jsonTable";

    // search and ui
    export let searchEventKey: string
    let searchBarInput: string = ""
    let placeholder

    $: debounceDelay = searchEventKey === '/' ? 600 : 850
    $: debouncedHandleInput = _.debounce(handleInput, debounceDelay)
    focusedElement.set(document.getElementById("search"))

    // Graphql
    let queryVars = {"name": "pod"}
    searchTerm.set("pod")

    // query all un-queried clusters
    $: execActiveContexts($activeContextStore, queryVars, false)

    // when search term changes, query all active contexts
    $: $searchTerm && execActiveContexts($activeContextStore, queryVars, true)

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

    // Handles dyanmic input
    function handleInput(): void {
        if (searchEventKey === ':') {
            search()
        } else if (searchEventKey === '/') {
            filterTerm.set(searchBarInput)
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
            placeholder = "filter e.g. /coredns"
            break
        case ":":
            placeholder = "search e.g. :pod"
            break
        default:
            placeholder = "Press : to search or / to filter"
    }
</script>

<div>
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
    </fieldset>
</div>

<style>
    div {
        padding-bottom: 15px;
        padding-top: 15px;
    }

    fieldset {
        width: 400px;
        white-space: nowrap;
        overflow: hidden;
        background-color: rgba(31, 31, 31, 1);
    }

    input {
        width: 300px;
        height: 12px;
        border: none;
        border-right: 1px solid #000000;
        outline: none;
    }
</style>