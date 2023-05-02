<script lang="ts">
    let toast: HTMLElement

    let title: string = ""
    let body: string = ""

    let status: number = 200;
    let type: "ok" | "error" = "ok"

    export const errorFn = (t: string, b: string, s: number = 500) => {
        title = t
        body = b
        status = s
        type = "error"

        bootstrap.Toast.getOrCreateInstance(toast).show();
    }

    export const okFn = (t: string, b: string, s: number = 200) => {
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
