import type {Writable} from "svelte/store"
import {writable} from "svelte/store"
import {GqlResourceQuery} from "./resourceQuery";
import {tableDataStore} from "./jsonTable";

// activeContextStore is a map type to take advantage of set() and delete()
export const activeContextStore: Writable<Map<string, GqlResourceQuery>> = writable(new Map())

// writeable removeContextStore and addContextStore provide operation level insight into
//  the activeContextStore, allowing subs on the current state, add operations, and remove operations
export const addContextStore: Writable<string> = writable()
export const removeContextStore: Writable<string> = writable()

// addContextStore manages the state of activeContextStore
addContextStore.subscribe((context) => {
    // TODO: it seems writable() calls subscribe with a null input

    // add context to activeContextStore
    activeContextStore.update((allContexts) => {
        let resourceQuery = new GqlResourceQuery(context)
        allContexts.set(context, resourceQuery)

        // clear addContextStore after activeContextStore is updated
        addContextStore.set(null)

        return allContexts
    })
})

// removeContextStore manages the state of activeContextStore
removeContextStore.subscribe((context) => {
    // TODO: it seems writable() calls subscribe with a null input

    // remove context from activeContextStore
    activeContextStore.update((allContexts) => {
        allContexts.delete(context)
        return allContexts
    })

    // remove context data from tableDataStore
    tableDataStore.update(tableData => {
        tableData.delete(context)
        return tableData
    })

    removeContextStore.set(null)
})