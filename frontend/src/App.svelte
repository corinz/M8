<script lang="ts">
    import SearchBar from "./SearchBar.svelte";
    import Legend from "./Legend.svelte";
    import {Client, cacheExchange, fetchExchange, setContextClient} from '@urql/svelte';
    import {dataStore} from "./jsonTable";
    import JsonTable from "./JsonTable.svelte";

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    const client = new Client({
        url: 'http://localhost:8080/graphql',
        exchanges: [cacheExchange, fetchExchange],
        maskTypename: true, // suppresses __typename field from graphql response
    });
    setContextClient(client);

    let searchEventKey = ''
</script>

<main>
    <div>
        <Legend></Legend>
        <SearchBar searchEventKey={searchEventKey}/>
        <JsonTable data={$dataStore}></JsonTable>
    </div>
</main>