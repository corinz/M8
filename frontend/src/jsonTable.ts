export interface tableObject {
    // TODO
}

import {writable} from "svelte/store"
export const dataStore = writable({"hello": "moto"})