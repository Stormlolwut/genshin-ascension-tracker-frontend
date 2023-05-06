<svelte:options accessors/>
<script lang="ts">

    import {auth} from '../../endpoints/auth'
    import {onDestroy} from "svelte";
    import AlertToast from "./alert-toast.svelte";
    import {FormValidator} from "$lib/utils/form/form-validator";
    import {IsEmptyRule} from "$lib/utils/form/rules/is-empty-rule";
    import {IsLongEnoughRule} from "$lib/utils/form/rules/is-long-enough-rule";
    import {Field} from "$lib/utils/form/field.js";

    export let title;
    export let submitText
    export let type: | "login" | "register" = 'login'

    let modalInstance
    let toast: any

    let username: string
    let password: string

    let isValid = false

    onDestroy(() => {
        if (modalInstance) {
            modalInstance.dispose()
        }
    });

    export let showModal = () => {
        const modalElement = document.getElementById('authModal')
        if (!modalInstance) {
            modalInstance = new bootstrap.Modal(modalElement)
        }
        modalInstance.show();
    }

    const validateForm = () => {
        const validatorResult = new FormValidator()
            .addRule(new IsEmptyRule())
            .addRule(new IsLongEnoughRule())
            .validate([
                new Field('Username', username),
                new Field('Password', password)
            ])

        if (typeof validatorResult === 'boolean') {
            isValid = true
            return isValid
        }
        toast.showError("Invalid", validatorResult)
        isValid = false

        return isValid
    }

    const authSubmit = async (event: SubmitEvent) => {
        if (!validateForm()) {
            return
        }

        const result = type === "login"
            ? auth.Login(username, password)
            : auth.Register(username, password)

        const isOk = await toast.handleAsync(result, true, false)

        if (isOk) {
            modalInstance.hide()
            clearFields()
        }
    }

    const clearFields = () => {
        username = ''
        password = ''
    }

</script>
<AlertToast bind:this={toast}/>
<div class="modal fade" id="authModal" tabindex="-1" aria-labelledby="authModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="authModalLabel">{title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form on:submit={authSubmit}>
                <div class="modal-body">
                    <label>Username
                        <input on:change={validateForm} bind:value={username} class="form-control me-2" name="username"
                               autocomplete="username">
                    </label>

                    <label class="mt-2">Password
                        <input on:change={validateForm} bind:value={password} class="form-control me-2" name="password"
                               type="password">
                    </label>
                </div>
                <div class="modal-footer">
                    <button disabled="{!isValid}" class="btn btn-primary">{submitText}</button>
                </div>
            </form>
        </div>
    </div>
</div>
