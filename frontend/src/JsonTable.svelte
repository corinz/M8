<script>
    export let data;
</script>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        border: 1px solid #7038e1;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #dc0f0f;
    }
</style>

<table>
    <tr>
        {#each Object.keys(data) as key}
            <th>{key}</th>
        {/each}
    </tr>
    <tr>
        {#each Object.values(data) as value}
            <td>{value}</td>
        {/each}
    </tr>
</table>
