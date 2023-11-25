import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

// activeContextStore is a map type to take advantage of set() and delete()
export const activeContextStore: Writable<Map<string, string>> = writable(new Map());
export const allContextStore: Writable<[]> = writable([]);