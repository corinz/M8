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
        <legend>{$searchTerm}s</legend>
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
    </fieldset>
{/if}

<style>
    table {
        width: 100%;
        /*border-collapse: collapse;*/
        overflow: hidden;
        table-layout: auto;
        overflow-y: auto;
    }

    td {
        padding: 4px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100px;
    }

    /*TODO: fix sticky header in desktop app*/
    th {
        padding: 6px;
        text-align: left;
        top: 70px;
        color: #1988d9;
        font-weight: normal;
        /*z-index: 1;*/
    }

    :global(.highlight) {
        background-color: rgba(60, 115, 176, 0.2)
    }
</style>