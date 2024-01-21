export interface tableObject {
    // TODO
}

import {writable} from "svelte/store"

export const tableDataStore = writable({})
export const searchTerm = writable("")