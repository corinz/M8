<script lang="ts">
    import SearchBar from "./SearchBar.svelte";
    import Legend from "./Legend.svelte";
    import {Client, cacheExchange, fetchExchange, setContextClient, subscriptionExchange} from '@urql/svelte';
    import JsonTable from "./JsonTable.svelte";
    import { createClient as createWSClient } from 'graphql-ws';

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    const graphqlUri = "localhost:8080/graphql"
    const wsClient = createWSClient({
        url: 'ws://' + graphqlUri,
    });

    const client = new Client({
        // TODO: https
        url: 'http://' + graphqlUri,
        exchanges: [cacheExchange, fetchExchange,
            subscriptionExchange({
            forwardSubscription(request) {
                const input = { ...request, query: request.query || '' };
                return {
                    subscribe(sink) {
                        const unsubscribe = wsClient.subscribe(input, sink);
                        return { unsubscribe };
                    },
                };
            },
        }),],
        maskTypename: true, // suppresses __typename field from graphql response
    });
    setContextClient(client);
</script>

<main>
    <div>
        <Legend></Legend>
        <SearchBar searchEventKey=""/>
        <JsonTable></JsonTable>
    </div>
</main>