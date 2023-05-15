import { writable } from 'svelte/store';
import type {ToastState} from "../../models/toast-state";

// Define the shape of your toast state


// Initialize your toast state
const initialState: ToastState = {
    title: '',
    body: '',
    status: 200,
    type: "hidden",
}

// Create the store
const createToastStore = () => {
    const { subscribe, update } = writable(initialState);

    return {
        subscribe,
        showError: (t: string, b: string, s = 500) => update(() => ({ title: t, body: b, status: s, type: "error" })),
        showOk: (t: string, b: string, s = 200) => update(() => ({ title: t, body: b, status: s, type: "ok" })),
        clear: () => update(() => initialState)
    };
}

export const toastStore = createToastStore();
