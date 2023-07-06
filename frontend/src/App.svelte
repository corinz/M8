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
    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        // forward slash to focus on search
        // preventDefault on '/' to ignore it from input box
        if (event.key === '/'){
            const search = document.getElementById('search')
            event.preventDefault()
            search.focus()
        }
    }
</script>

<main>
    <div on:keydown={handleKeyDown}>
    <SearchBar/>
    </div>
</main>



