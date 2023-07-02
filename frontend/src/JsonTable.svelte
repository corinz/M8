<script>
    export let data;
</script>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
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