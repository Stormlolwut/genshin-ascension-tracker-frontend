<script lang="ts">

    import {auth} from '../../endpoints/auth'

    export let title;
    export let submitText
    export let type: | "login" | "register" = 'login'

    const authSubmit = async (event: SubmitEvent) => {
        const target = event.target as any
        const action = target.action as string

        const urlParams = new URLSearchParams(action.split('?')[1]);

        const username = urlParams.get('username')
        const password = urlParams.get('password')

        if (!username || !password) {
            console.error('Username or password is missing')
            return
        }

        const result = type === "login" ? await auth.Login(username, password) : await auth.Register(username, password)

        if (result.status !== 200) {
            console.error('Something went wrong!')
        }

        return result
    }

</script>
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
                        <input class="form-control me-2" name="username" autocomplete="username">
                    </label>

                    <label class="mt-2">Password
                        <input class="form-control me-2" name="password" type="password">
                    </label>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary">{submitText}</button>
                </div>
            </form>
        </div>
    </div>
</div>
