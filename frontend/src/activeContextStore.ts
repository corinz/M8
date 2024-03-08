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

// finds active contexts that have not been queried
export async function execActiveContexts(activeContextMap, queryVars, execAll) {
    if (execAll) {
        activeContextMap.forEach((queryObject, contextName) => {
            if (contextName != "" && contextName != null) {
                queryObject.executeQuery(queryVars)
                fetchContextData(queryObject)
            }
        })
    } else {
        activeContextMap.forEach((queryObject, contextName) => {
            if (!queryObject.queryIssued && contextName != "" && contextName != null) {
                queryObject.executeQuery(queryVars)
                fetchContextData(queryObject)
            }
        })
    }
}

// fetches data from existing query store
async function fetchContextData(queryObject) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    let retries = 0
    let queryStore = queryObject.queryStore
    let fetching, error, data
    queryStore.subscribe(store => {
        fetching = store.fetching
        error = store.error
        data = store.data
    })

    while (retries < 40) {
        if (fetching) {
            console.log("INFO: GraphQL Query Store fetching: ", queryObject.contextName)
        } else if (error) {
            console.log("ERROR: GraphQL Query Store: ", queryObject.contextName)
            throw new Error(error)
        } else if (data) {
            // update tableDataStore with fetched data
            tableDataStore.update(m => {
                m.set(queryObject.contextName, queryObject.transform(data))
                return m
            })
            queryObject.queryIssued = true
            return
        }
        if (retries >= 39) {
            console.log("INFO: GraphQL Query Store retries exhausted: ", queryObject.contextName)
            return
        }
        retries++
        await delay(250)
    }
}

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