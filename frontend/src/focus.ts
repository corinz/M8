import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

export const defaultFocusElementId: string = 'defaultFocus'
const element: HTMLElement = null
export const focusedElement: Writable<HTMLElement> = writable(element);

focusedElement.subscribe((e: HTMLElement): void => {
    if (e) {
        e.focus();
    }
})

export function defaultFocus(): void {
    const e: HTMLElement = document.getElementById(defaultFocusElementId);
    focusedElement.set(e)
}