<script lang="ts">
    import {searchTerm, filterTerm, tableDataStore, filter} from "./jsonTable"

    let activeRowIndex = 0, filteredData, displayedData
    $: data = Array.from($tableDataStore.values()).flatMap(arr => arr)
    $: displayedData = filteredData ? filteredData : data

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        let element = document.getElementById('highlight')
        if (element) {
            element.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"})
        }
        event = event as KeyboardEvent;
        if (event.key === 'ArrowUp' || event.key === 'Up') {
            activeRowIndex = Math.max(0, activeRowIndex - 1);
        } else if (event.key === 'ArrowDown' || event.key === 'Down') {
            activeRowIndex = Math.min(data.length - 1, activeRowIndex + 1);
        }
    }

    filterTerm.subscribe( term => {
        if (term == "" || term == null){
            filteredData = null
            return
        }
        filteredData = filter(data, term)
    })

    window.addEventListener("keydown", function (e) {
        handleKeyDown(e)
    });

</script>

{#if (!displayedData)}
    Dataset does not exist
{:else if displayedData.length === 0}
    Dataset is empty
{:else if displayedData.length > 0}
    <fieldset>
        <legend>{$searchTerm.charAt(0).toUpperCase() + $searchTerm.slice(1) + "s" + "(" + displayedData.length + ")"} </legend>
        <div class="scrollable-content">
            <table>
                <!-- HEADER ROW -->
                <thead>
                <tr>
                    {#each Object.keys(displayedData[0]) as header}
                            <th columnId={header}>
                                {header}
                            </th>
                    {/each}
                </tr>
                </thead>
                <!-- DATA ROWS -->
                <tbody>
                {#each Object.entries(displayedData) as [id, obj] }
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