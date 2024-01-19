<script lang="ts">
    import DataTable, {Body, Cell, Head, Label, Row} from '@smui/data-table'
    import {dataStore} from "./jsonTable"

    let data, activeRowIndex
    $: {
        data = $dataStore
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

    window.addEventListener("keydown", function(e) {
        handleKeyDown(e)
    });

</script>

{#if (!data)}
    Dataset is empty
{:else if data.length > 0}
    <DataTable stickyHeader style="width: 100%;">
        <!-- HEADER ROW -->
        <Head>
            <Row>
                {#each Object.keys(data[0]) as header, i}
                    {#if i == 0 }
                        <Cell columnId={header} style="width: 100%;">
                            <Label>{header}</Label>
                        </Cell>
                    {:else }
                        <Cell columnId={header}>
                            <Label>{header}</Label>
                        </Cell>
                    {/if}
                {/each}
            </Row>
        </Head>
        <!-- DATA ROWS -->
            <Body>
            {#each Object.entries(data) as [id, obj] }
                {#if id == activeRowIndex}
                    <Row id="highlight">
                        {#each Object.values(obj) as val }
                            <Cell class="highlight">{val}</Cell>
                        {/each}
                    </Row>
                {:else }
                    <Row>
                        {#each Object.values(obj) as val }
                            <Cell>{val}</Cell>
                        {/each}
                    </Row>
                {/if}
            {/each}
            </Body>
    </DataTable>
{/if}

<style>
    :global(.highlight) {
        background-color: rgba(109, 119, 131, 0.12);
    }
    .scroll {
        /*TODO: this setting enables horizontal scrolling for the table */
        /*but disables the sticky header*/
        overflow-x: auto;
    }
</style>