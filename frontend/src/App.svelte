<script lang="ts">
    import SearchBar from "./SearchBar.svelte";
    import Legend from "./Legend.svelte";
    import {focusedElement, defaultFocus} from "./focus"
    import {Client, cacheExchange, fetchExchange, setContextClient} from '@urql/svelte';
    import {dataStore} from "./jsonTable";
    import JsonTable from "./JsonTable.svelte";

    const client = new Client({
        url: 'http://localhost:8080/graphql',
        exchanges: [cacheExchange, fetchExchange],
        maskTypename: true, // suppresses __typename field from graphql response
    });
    setContextClient(client);

    let searchEventKey = ''
    defaultFocus()

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        if (event.key === '/' || event.key === ':') { // search bar focus
            searchEventKey = event.key
            event.preventDefault() // preventDefault to ignore it from input box
            focusedElement.set(document.getElementById('search'))
        } else if (event.key === "Escape") { // default focus
            const highlightRow = document.getElementById('highlight')
            defaultFocus()
            highlightRow.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    }
</script>

<main on:keydown={handleKeyDown}>
    <div>
        <Legend></Legend>
        <SearchBar searchEventKey={searchEventKey}/>
        <JsonTable data={$dataStore}></JsonTable>
    </div>
</main>