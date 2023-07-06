<script lang="ts">
    import {Input} from '@smui/textfield';
    import Paper from '@smui/paper';
    import {Icon} from '@smui/common';
    import {AppGetApiResources, AppGetApiResourcesByName} from "../wailsjs/go/main/App";
    import {v1} from "../wailsjs/go/models";
    import JsonTable from "./JsonTable.svelte";

    let value: string
    let result: v1.APIResource

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    async function getApiList(): Promise<v1.APIResource[]> {
        return await AppGetApiResources().then(result => result)
    }

    function search(): void {
        AppGetApiResourcesByName(value).then(r => {
            if (r.name == null || r.name == "") {
                result = null
            } else {
                result = r
            }
        })
    }

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        if (event.key === 'Enter') {
            search();
        }
    }
</script>

<div class="solo-demo-container solo-container">
    <Paper class="solo-paper" elevation={6}>
        <Icon class="material-icons">search</Icon>
        <Input
                id="search"
                bind:value
                on:keydown={handleKeyDown}
                on:input={debounce(search, 750)}
                placeholder="Search"
                class="solo-input"
                type="text"
        />
    </Paper>
</div>

{#if result != null}
    <JsonTable data={result}/>
{:else}
    {#await getApiList()}
        <p>...fetching</p>
    {:then object}
        <JsonTable data={object}/>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
{/if}

<style>
    .solo-demo-container {
        padding: 36px 18px;
        background-color: var(--mdc-theme-background, #f8f8f8);
        border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    }

    .solo-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    * :global(.solo-paper) {
        display: flex;
        align-items: center;
        flex-grow: 1;
        max-width: 600px;
        margin: 0 12px;
        padding: 0 12px;
        height: 48px;
    }

    * :global(.solo-paper > *) {
        display: inline-block;
        margin: 0 12px;
    }

    * :global(.solo-input) {
        flex-grow: 1;
        color: var(--mdc-theme-on-surface, #000);
    }

    * :global(.solo-input::placeholder) {
        color: var(--mdc-theme-on-surface, #000);
        opacity: 0.6;
    }

    * :global(.solo-fab) {
        flex-shrink: 0;
    }
</style>