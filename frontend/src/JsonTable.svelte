<script lang="ts">
    import IconButton from '@smui/icon-button';
    import DataTable, {Body, Cell, Head, Label, Row, SortValue,} from '@smui/data-table';

    export let data;

    let activeRowIndex = 0;
    let highlightRow, sortedData;
    $: {
        sortedData = data;
        activeRowIndex = 0;
    }
    let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';
    let sort = 'id';

    // TODO: fix this
    function handleSort() {
        sortedData.sort((a, b) => {
            const [aVal, bVal] = [a[sort], b[sort]][
                sortDirection === 'ascending' ? 'slice' : 'reverse'
                ]();
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal);
            }
            return Number(aVal) - Number(bVal);
        });
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
    <DataTable
            stickyHeader
            sortable
            bind:sort
            bind:sortDirection
            on:keydown={handleKeyDown}
            on:SMUIDataTable:sorted={handleSort}
            table$aria-label="Multi-Result Table"
            style="width: 100%;"
    >
        <!-- HEADER ROW -->
        <Head>
            <Row>
                {#each Object.keys(sortedData[0]) as header, i}
                    {#if i == 0 }
                        <Cell columnId={header} style="width: 100%;">
                            <Label>{header}</Label>
                            <!--defaultFocus enables default scrolling capability-->
                            <IconButton id="defaultFocus" class="material-icons">arrow_upward</IconButton>
                        </Cell>
                    {:else }
                        <Cell columnId={header}>
                            <Label>{header}</Label>
                            <IconButton class="material-icons">arrow_upward</IconButton>
                        </Cell>
                    {/if}
                {/each}
            </Row>
        </Head>
        <!-- DATA ROWS -->
        <!--{#if sortedData.length > 0}-->
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
        <!--{/if}-->
    </DataTable>
{/if}

<style>
    /* Reset some of the demo app styles that interfere. */
    :global(body),
    :global(html) {
        height: auto;
        width: auto;
        position: static;
    }

    :global(.highlight) {
        background-color: rgba(109, 119, 131, 0.12);
    }

</style>