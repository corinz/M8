<script lang="ts">
    import {onMount} from 'svelte';
    import {BaseQuery} from "./gqlQuery";
    import {gql} from "@urql/svelte";

    type Cluster = {
        id: number
        label: string
        checked: boolean
    }

    class ContextResourceQuery extends BaseQuery {
        query = gql`query RootQuery {
            contexts
        }`
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => { window.removeEventListener('keydown', handleKeyPress)}
    });

    const contextQuery = new ContextResourceQuery
    let clusterQStore = contextQuery.executeQuery()
    $: clusters = $clusterQStore.data ? $clusterQStore.data["contexts"] : null

    export let clusterArr: Cluster[] = []
    // when clusters query is done, populate clusterArr
    // this query continues to execute
    $: if (clusters && clusterArr.length == 0) {
        for (let i = 0; i < clusters.length; i++) {
            let clusterObj: Cluster = {
                id: i+1,
                label: clusters[i],
                checked: false,
            }
            clusterArr.push(clusterObj)
        }
    }

    function toggleCluster(id) {
        if (id <= clusterArr.length) {
            clusterArr[id - 1].checked = !clusterArr[id - 1].checked
        }
    }

    function handleKeyPress(event) {
        const key = event.key;
        if (event.key >= '1' && event.key <= '9') {
            toggleCluster(key)
        }
    }
</script>

<div>
    <fieldset>
        <legend>Kubernetes Clusters</legend>
        {#if $clusterQStore.data}
            <div>
                {#each clusterArr as {id, label, checked}}
                    <div>
                        <input
                                type="checkbox"
                                id={id}
                                aria-label={label}
                                bind:checked={checked}
                        />
                        <label for={id}>{id}: {label}</label>
                    </div>
                {/each}
            </div>
        {/if}
    </fieldset>
</div>