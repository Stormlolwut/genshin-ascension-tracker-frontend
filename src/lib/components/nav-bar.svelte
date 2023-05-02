<script lang="ts">
    import {page} from '$app/stores'
    import AuthModal from '$lib/components/auth-modal.svelte'

    let modalType = "login"
    let modalTitle = "Login"
    let modalButtonText = "Send"

    const setModalToLogin = () => {
        modalType = "login"
        modalTitle = "Login"
        modalButtonText = "Send"
    }

    const setModalToRegister = () => {
        modalType = "register"
        modalTitle = "Register"
        modalButtonText = "Send"
    }

    const isActive = (path: string) => {
        return $page.route.id === path ? 'active' : '';
    }
</script>
<AuthModal title="{modalTitle}" submitText="{modalButtonText}" type="{modalType}"/>
<nav class="navbar navbar-expand-lg bg-body-tertiary mb-4">
    <div class="container-fluid">
        <span class="navbar-brand">Genshin Ascension Tracker (GAT)</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link {isActive('/')}" aria-current="page" href="/">Characters</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link {isActive('/inventory')}" href="/inventory">Inventory</a>
                </li>
                <li class="nav-item">
                    <div class="dropdown">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            <i class="bi bi-person-fill"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <button on:click={setModalToLogin} type="button" class="btn dropdown-item"
                                        data-bs-toggle="modal" data-bs-target="authModal">Login
                                </button>
                            </li>
                            <li>
                                <button on:click={setModalToRegister} type="button" class="btn dropdown-item"
                                        data-bs-toggle="modal" data-bs-target="authModal">Register
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
