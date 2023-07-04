<script lang="ts">
    import DataTable, {
        Head,
        Body,
        Row,
        Cell,
        Label,
        SortValue,
    } from '@smui/data-table';
    import IconButton from '@smui/icon-button';

    export let data;
    let sortedData

    $: sortedData = data;
    let sortDirection: Lowercase<keyof typeof SortValue> = 'ascending';
    let sort = 'id';

    function handleSort() {
        sortedData = data
        sortedData.sort((a, b) => {
            const [aVal, bVal] = [a[sort], b[sort]][
                sortDirection === 'ascending' ? 'slice' : 'reverse'
                ]();
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal);
            }
            return Number(aVal) - Number(bVal);
        });
        sortedData = sortedData;
    }
</script>

{#if data.length > 0}
        <DataTable
                stickyHeader
                sortable
                bind:sort
                bind:sortDirection
                on:SMUIDataTable:sorted={handleSort}
                table$aria-label="Multi-Result Table"
                style="width: 100%;"
        >
        <Head>
            <Row>
                <Cell columnId="name" style="width: 100%;">
                    <Label>Name</Label>
                    <!-- For non-numeric columns, icon comes second. -->
                    <IconButton class="material-icons">arrow_upward</IconButton>
                </Cell>
                <Cell columnId="singularName">
                    <Label>Singular Name</Label>
                    <IconButton class="material-icons">arrow_upward</IconButton>
                </Cell>
                <Cell columnId="namespaced">
                    <Label>Namespaced</Label>
                    <IconButton class="material-icons">arrow_upward</IconButton>
                </Cell>
                <Cell columnId="kind">
                    <Label>Kind</Label>
                    <IconButton class="material-icons">arrow_upward</IconButton>
                </Cell>
                <Cell columnId="verbs">
                    <Label>Verbs</Label>
                    <IconButton class="material-icons">arrow_upward</IconButton>
                </Cell>
                <Cell columnId="shortNames">
                    <Label>Short Names</Label>
                    <IconButton class="material-icons">arrow_upward</IconButton>
                </Cell>
                <Cell columnId="categories">
                    <Label>Categories</Label>
                    <IconButton class="material-icons">arrow_upward</IconButton>
                </Cell>
            </Row>
        </Head>
        <Body>
        {#each Object.entries(sortedData) as [id, {name, singularName, namespaced, kind, verbs, shortNames, categories}]}
            <Row>
                <Cell>{name}</Cell>
                <Cell>{singularName}</Cell>
                <Cell>{namespaced}</Cell>
                <Cell>{kind}</Cell>
                <Cell>{verbs}</Cell>
                <Cell>{shortNames}</Cell>
                <Cell>{categories}</Cell>
            </Row>
        {/each}
        </Body>
    </DataTable>
{:else}
    <DataTable stickyHeader table$aria-label="User List" style="width: 100%;">
        <Head>
            <Row>
                <Cell>Name</Cell>
                <Cell>Singular Name</Cell>
                <Cell>Namespaced</Cell>
                <Cell>Kind</Cell>
                <Cell>Verbs</Cell>
                <Cell>Short Names</Cell>
                <Cell>Categories</Cell>
            </Row>
        </Head>
        <Body>
        <Row>
            {#each Object.values(data) as value}
                <Cell>{value}</Cell>
            {/each}
        </Row>
        </Body>
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

    :global(#smui-app) {
        display: block;
        height: auto;
        overflow: auto;
    }
</style>