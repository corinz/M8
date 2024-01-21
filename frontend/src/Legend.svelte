<script lang="ts">
    import {onMount} from 'svelte';
    import {BaseQuery} from "./gqlQuery";
    import {gql} from "@urql/svelte";
    import {activeContextStore, allContextStore} from "./activeContextStore";

    // Cluster is used to display legend items
    type Cluster = {
        id: number
        context: string
        checked: boolean
    }

    // ContextResourceQuery fetches a list of contexts from the api
    class ContextResourceQuery extends BaseQuery {
        query = gql`query RootQuery {
            contexts
        }`
    }

    const contextQuery = new ContextResourceQuery
    let clusterQStore = contextQuery.executeQuery()
    let clusters

    let activeContextsLocal: Map<string, string> = new Map()
    let clusterArr: Cluster[] = []

    // execute cluster api query and set store for external use
    $: if ($clusterQStore.data) {
        clusters = $clusterQStore.data["contexts"]
        allContextStore.set(clusters)
    } else {
        clusters = null
    }

    // TODO: is there a better way?
    // when clusters query is done, populate clusterArr
    // test length of clusterArr to stop reactive func when length > 0
    $: if (clusters && clusterArr.length == 0) {
        for (let i = 0; i < clusters.length; i++) {
            let clusterObj: Cluster = {
                id: i + 1,
                context: clusters[i],
                checked: false,
            }
            clusterArr.push(clusterObj)
        }
    }

    // Toggle an active context
    function toggleCluster(id) {
        if (id <= clusterArr.length) {
            let toggle = !clusterArr[id - 1].checked
            let name = clusterArr[id - 1].context
            clusterArr[id - 1].checked = toggle

            // update active contexts
            if (toggle) {
                activeContextsLocal.set(name, name)
            } else {
                activeContextsLocal.delete(name)
            }
        }
        // set activeContexts store so we can subscribe in other places
        activeContextStore.set(activeContextsLocal)
    }

    // handleKeyPress toggles clusters based on numpad key presses
    function handleKeyPress(event) {
        const key = event.key;
        if (event.key >= '1' && event.key <= '9') {
            event.preventDefault()
            toggleCluster(key)
        }
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    });
</script>

<div>
    <fieldset>
        <legend>Local Contexts</legend>
        {#if $clusterQStore.data}
            <div>
                {#each clusterArr as {id, context, checked}}
                    <div>
                        <input
                                type="checkbox"
                                id={id}
                                aria-label={context}
                                bind:checked={checked}
                        />
                        <label for={id}>{id}: {context}</label>
                    </div>
                {/each}
            </div>
        {/if}
    </fieldset>
</div>

<style>
    fieldset {
        width: 400px;
        max-height: 90px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-y: auto;
    }
</style>