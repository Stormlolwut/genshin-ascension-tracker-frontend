<svelte:options accessors />
<script lang="ts">
    let toast: HTMLElement

    let title = ""
    let body = ""

    let status = 200;
    let type: "ok" | "error" = "ok"


    /**
     * Handles a promise and shows a toast if the promise fails or succeeds
     * @param promise The promise to handle
     * @param showSuccess Whether to show a toast on success
     * @param fallback? The fallback value it returns if the promise fails
     */
    export const handleAsync = async <T>(promise: unknown, showSuccess = false, fallback?: any): Promise<T> => {
        try {
            const response = await promise;
            if (showSuccess) showOk("Success", response.message, response.status);

            return response?.body || response
        } catch (e) {
            const body = JSON.parse(e.message)
            showError("Error", body.message, body.status);
            return fallback;
        }
    }

    export const showError = (t: string, b: string, s = 500) => {
        title = t
        body = b
        status = s
        type = "error"

        bootstrap.Toast.getOrCreateInstance(toast).show();
    }

    export const showOk = (t: string, b: string, s = 200) => {
        title = t
        body = b
        status = s
        type = "ok"

        bootstrap.Toast.getOrCreateInstance(toast).show();
    }

    const isOk = (type: "ok" | "error") => {
        return type === "ok"
    }

</script>
<div class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3">
    <div bind:this={toast} class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        {#if isOk(type)}
            <div  class="toast-header toast-header-ok">
                <strong class="me-auto">{title}</strong>
                <small>{status}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        {/if}
        {#if !isOk(type)}
            <div class="toast-header toast-header-error">
                <strong class="me-auto">{title}</strong>
                <small>{status}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        {/if}
        <div class="toast-body">
            {body}
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
