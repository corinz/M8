<script lang="ts">
    import DataTable, {Body, Cell, Head, Label, Row} from '@smui/data-table';

    export let data;

    let activeRowIndex = 0;
    let highlightRow, sortedData;
    $: {
        sortedData = data;
        activeRowIndex = 0;
    }

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        if (event.key === 'ArrowUp' || event.key === 'Up') {
            activeRowIndex = Math.max(0, activeRowIndex - 1);
        } else if (event.key === 'ArrowDown' || event.key === 'Down') {
            activeRowIndex = Math.min(sortedData.length - 1, activeRowIndex + 1);
        }
    }

    $: if (highlightRow) {
        document.getElementById('defaultFocus').focus();
    }
</script>

{#if (!sortedData)}
    Dataset is empty
{:else if sortedData.length > 0}
    <DataTable on:keydown={handleKeyDown} style="width: 100%;">
        <!-- HEADER ROW -->
        <Head>
            <Row>
                {#each Object.keys(sortedData[0]) as header, i}
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
            {#each Object.entries(sortedData) as [id, obj] }
                {#if id == activeRowIndex}
                    <Row id="highlight" bind:this={highlightRow}>
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
</style>