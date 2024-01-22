<script lang="ts">
    import {tableDataStore, searchTerm} from "./jsonTable"

    let data, activeRowIndex
    $: {
        data = $tableDataStore
        activeRowIndex = 0
    }

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        document.getElementById('highlight').scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});

        event = event as KeyboardEvent;
        if (event.key === 'ArrowUp' || event.key === 'Up') {
            activeRowIndex = Math.max(0, activeRowIndex - 1);
        } else if (event.key === 'ArrowDown' || event.key === 'Down') {
            activeRowIndex = Math.min(data.length - 1, activeRowIndex + 1);
        }
    }

    window.addEventListener("keydown", function (e) {
        handleKeyDown(e)
    });

</script>

{#if (!data)}
    Dataset is empty
{:else if data.length > 0}
    <fieldset>
        <legend>{$searchTerm.charAt(0).toUpperCase() + $searchTerm.slice(1)}s</legend>
        <div class="scrollable-content">
            <table>
                <!-- HEADER ROW -->
                <thead>
                <tr>
                    {#each Object.keys(data[0]) as header, i}
                        {#if i == 0 }
                            <th columnId={header}>
                                {header}
                            </th>
                        {:else }
                            <th columnId={header}>
                                {header}
                            </th>
                        {/if}
                    {/each}
                </tr>
                </thead>
                <!-- DATA ROWS -->
                <tbody>
                {#each Object.entries(data) as [id, obj] }
                    {#if id == activeRowIndex}
                        <tr id="highlight">
                            {#each Object.values(obj) as val }
                                <td class="highlight">{val}</td>
                            {/each}
                        </tr>
                    {:else }
                        <tr>
                            {#each Object.values(obj) as val }
                                <td>{val}</td>
                            {/each}
                        </tr>
                    {/if}
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