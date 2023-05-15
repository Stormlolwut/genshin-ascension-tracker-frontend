<svelte:options accessors />
<script lang="ts">
    import { toastStore } from "$lib/stores/toast-store";
    import {onMount} from "svelte";
    import type {ToastState} from "../../models/toast-state";

    let toast: HTMLElement
    let toastState: ToastState = {
        title: "",
        body: "",
        status: 200,
        type: "ok"
    };


    onMount(async () => {
        const {Toast} = await import('bootstrap');
        toastStore.subscribe((state: ToastState) => {
            if (state.type === "hidden") return;

            toastState = state
            Toast.getOrCreateInstance(toast).show();
            toastStore.clear()
        })
    })

    const isOk = (type: "ok" | "error" | "hidden") => {
        return type === "ok"
    }

</script>
<div class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
    <div bind:this={toast} class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        {#if isOk(toastState.type)}
            <div  class="toast-header toast-header-ok">
                <strong class="me-auto">{toastState.title}</strong>
                <small>{toastState.status}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        {/if}
        {#if !isOk(toastState.type)}
            <div class="toast-header toast-header-error">
                <strong class="me-auto">{toastState.title}</strong>
                <small>{toastState.status}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        {/if}
        <div class="toast-body">
            {toastState.body}
        </div>
    </div>
</div>

<style lang="scss">
    .toast-header-error {
        background-color: #dc3545;
        color: white;
    }
    .toast-header-ok {
        background-color: #28a745;
        color: white;
    }
</style>
