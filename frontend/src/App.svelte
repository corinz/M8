<svelte:head>
    <!-- SMUI Styles -->
    <link rel="stylesheet" href="node_modules/svelte-material-ui/bare.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <!-- Material Icons, Roboto, and Roboto Mono fonts -->
    <link
            href="https://fonts.googleapis.com/css2?family=Material+Icons&Roboto+Mono:ital@0;1&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
    />
</svelte:head>

<script lang="ts">
    import SearchBar from "./SearchBar.svelte";
    import {focusedElement, defaultFocus} from "./focus"
    import { Client, cacheExchange, fetchExchange, setContextClient } from '@urql/svelte';

    const client = new Client({
        url: 'http://localhost:8080/graphql',
        exchanges: [cacheExchange, fetchExchange],
        maskTypename: true, // suppresses __typename field from graphql response
    });
    setContextClient(client);

    document.body.style.cursor = 'none';
    let searchEventKey = ''
    defaultFocus()

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        // preventDefault to ignore it from input box
        if (event.key === '/' || event.key === ':') { // search bar focus
            searchEventKey = event.key
            event.preventDefault()
            focusedElement.set(document.getElementById('search'))
        } else if (event.key === "Escape") { // default focus
            const highlightRow = document.getElementById('highlight')
            defaultFocus()
            highlightRow.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    }
</script>

<main class="nopointer" on:keydown={handleKeyDown}>
    <div>
        <SearchBar searchEventKey={searchEventKey}/>
    </div>
</main>

<style>
    .nopointer {
        pointer-events: none;
    }
</style>