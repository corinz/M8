import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import Fuse from "fuse.js";

const filterOptions = {
    keys: ['name', 'Name', 'namespace', 'Namespace'],
    threshold: 0.40 // 0 = perfect match, 1 = indiscriminate
}

export const tableDataStore: Writable<Map<string, any>> = writable(new Map())
export const searchTerm: Writable<string> = writable("")
export const filterTerm: Writable<string> = writable()

export interface tableObject {
    // TODO
}

export function filter(data: any, str: string): any {
    const fuse = new Fuse(data, filterOptions)
    let filteredTableObjectMap = fuse.search(str)
    return filteredTableObjectMap.map((idx) => idx.item)
}