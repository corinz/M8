<script lang="ts">
    import {searchTerm, filterTerm, tableDataStore, filter} from "./jsonTable"
    import ContextData from "./ContextData.svelte";
    import {activeContextStore} from "./activeContextStore";
    import {transform} from "./utils"
    import {rowCount} from "./utils";

    let activeRowIndex = 0, filteredData, randomStore
    let stores = []
    $: stores = Array.from($activeContextStore.values()).length > 0 ? Array.from($activeContextStore.values()) : []
    $: randomStore = stores.length > 0 ? stores[0].subscriptionStore : null

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        let element = document.getElementById('highlight')
        if (element) {
            element.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"})
        }
        event = event as KeyboardEvent;
        if (event.key === 'ArrowUp' || event.key === 'Up') {
            activeRowIndex = Math.max(0, activeRowIndex - 1);
        } else if (event.key === 'ArrowDown' || event.key === 'Down') {
            activeRowIndex = Math.min($rowCount - 1, activeRowIndex + 1);
        }
    }

    filterTerm.subscribe(term => {
        if (term == "" || term == null) {
            filteredData = null
            return
        }
        filteredData = filter(data, term)
    })

    window.addEventListener("keydown", function (e) {
        handleKeyDown(e)
    });
</script>

{#if randomStore && $randomStore.data && stores.length > 0}
    {@const [[_, obj]] = Object.entries($randomStore.data)}

    <fieldset>
        <legend>{$searchTerm.charAt(0).toUpperCase() + $searchTerm.slice(1) + "s" + "(" + $rowCount + ")"} </legend>
        <div class="scrollable-content">
            <table>
                <thead>
                <tr>
                    <th>Context</th>
                    {#each Object.keys(transform(obj)) as key}
                        <th>
                            {key}
                        </th>
                    {/each}
                </tr>
                </thead>

                <tbody>
                {#each stores as store}
                    <ContextData store={store.subscriptionStore}>
                        <td slot="cluster-context">{store.contextName}</td>
                    </ContextData>
                {/each}
                </tbody>
            </table>
        </div>
    </fieldset>
{/if}

<style>
    table {
        width: 100%;
    }

    .scrollable-content {
        max-height: 300px; /* Set the maximum height for scrollability */
        overflow-y: hidden; /* Enable vertical scrolling if content exceeds the height */
    }

    td {
        padding: 4px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100px;
    }

    th {
        padding: 6px;
        text-align: left;
        color: #1988d9;
        font-weight: normal;

        /* required for sticky header */
        background-color: rgba(31, 31, 31, 1);
        position: sticky;
        top: 2px;
    }

    :global(.highlight) {
        background-color: rgba(60, 115, 176, 0.2)
    }
</style>