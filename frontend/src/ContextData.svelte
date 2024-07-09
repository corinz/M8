<script lang="ts">
    import {transform, rowCount} from "./utils";
    import { onDestroy } from 'svelte';
    export let store
    import {type Writable, writable} from "svelte/store";
    // const items = writable([]);
    export const items: Writable<Array<any>> = writable([])


    $: if ($store.data) {
        let [[_, obj]] = Object.entries($store.data)
        items.update( arr => {
            arr.push(transform(obj))
            return arr
        } )
    }

    items.subscribe( i => {
        rowCount.update(n => n + $items.length)
    })

    onDestroy(() => {
        rowCount.update(n => n - $items.length);
    });


</script>

{#if $items.length > 0 }
    {#each $items as item}
        <tr>
            <td>
                <slot name="cluster-context"/>
            </td>
            {#each Object.values(item) as cell }
                <td>{cell}</td>
            {/each}
        </tr>
    {/each}
{/if}

<style>
    table {
        width: 100%;
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

