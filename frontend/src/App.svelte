<script lang="ts">
  import {GetApiResources} from '../wailsjs/go/main/App.js'
  import JsonTable from './JsonTable.svelte'
  import {v1} from "../wailsjs/go/models";

  let name: string
  let resultObject: v1.APIResource
  let api: string

  function getApi(): void {
    GetApiResources(api).then(result => resultObject = result)
  }
</script>

<main>
  <div class="input-box" id="apiInput">
    <input autocomplete="off" bind:value={api} class="input" id="api" type="text"/>
    <button class="btn" on:click={getApi}>Get API</button>
  </div>

<!--  TODO how does this get resolved when there is a delay in retrieving data? -->
  {#if resultObject != null}
    <JsonTable data={resultObject} />
  {:else}
    <p>No data to show yet.</p>
  {/if}
</main>

<style>

  #logo {
    display: block;
    width: 50%;
    height: 50%;
    margin: auto;
    padding: 10% 0 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-origin: content-box;
  }

  .result {
    height: 20px;
    line-height: 20px;
    margin: 1.5rem auto;
  }

  .input-box .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: none;
    margin: 0 0 0 20px;
    padding: 0 8px;
    cursor: pointer;
  }

  .input-box .btn:hover {
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    color: #ffffff;
  }

  .input-box .input {
    border: none;
    border-radius: 3px;
    outline: none;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: rgba(240, 240, 240, 1);
    -webkit-font-smoothing: antialiased;
  }

  .input-box .input:hover {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

  .input-box .input:focus {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

</style>
