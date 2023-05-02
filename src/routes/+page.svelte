<script lang="ts">
    import "../scss/styles.scss"

    import type {Character} from "../models/character"
    import type {User} from "../models/user"
    import type {Material} from "../models/material"

    import NavBar from "$lib/components/nav-bar.svelte"
    import SearchBar from "$lib/components/search-bar.svelte"
    import Toast from "$lib/components/toast.svelte"

    import charactersJson from "$lib/data/characters.json"
    import userJson from "$lib/data/user.json"
    import materialsJson from "$lib/data/materials.json"

    import {onMount} from "svelte";

    import {inventory} from "../endpoints/inventory";
    import {favorites} from "../endpoints/favorites";
    import {auth} from "../endpoints/auth"

    const characters: Array<Character> = charactersJson
    const materials: Array<Material> = materialsJson

    const user: User = userJson

    let filteredCharacters: Array<Character> = charactersJson
    console.log(filteredCharacters)

    let toastError
    let toastOk

    const Login = async () => {
        await handlePromise(auth.Register('admin', 'admin'), true);
    }

    onMount(async () => {
        user.inventory = await handlePromise(inventory.retrieve(), false, user.inventory);
        user.favorites = await handlePromise(favorites.retrieve(), false, user.favorites);

        filteredCharacters = filteredCharacters
    })

    /**
     * Handles a promise and shows a toast if the promise fails or succeeds
     * @param promise The promise to handle
     * @param showSuccess Whether to show a toast on success
     * @param fallback The fallback value to return if the promise fails
     */
    const handlePromise = async <T>(promise: Promise<T>, showSuccess = false, fallback?: any): Promise<T> => {
        try {
            const response = await promise;
            if (showSuccess) toastOk("Success", response.message, response.status);

            return response?.body || response
        } catch (e) {
            const json = JSON.parse(e.message);
            toastError("Error", json.message, json.status);
            return fallback;
        }
    }

    const addToFavorites = async (character) => {
        user.favorites.push(character.id)
        await handlePromise(favorites.update(user.favorites), true)

        filteredCharacters = filteredCharacters
    }

    const removeFromFavorites = async (character) => {
        user.favorites = user.favorites.filter((id) => id !== character.id)
        await handlePromise(favorites.update(user.favorites), true)

        filteredCharacters = filteredCharacters
    }

    const isFavorite = (character) => user.favorites.includes(character?.id)

    const getMaterialImage = (material) => {
        return materials.find((mat) => mat.id === material.id)?.image;
    }
    const getCollectedMaterial = (material) => {
        return user.inventory.find((invMaterial) => invMaterial.id === material.id)?.collected ?? 0;
    }
    const filterCharacters = (event: CustomEvent) => {
        filteredCharacters = event.detail.items;
    }
</script>
<Toast bind:okFn={toastOk} bind:errorFn={toastError}></Toast>
<NavBar></NavBar>
<div class="mx-auto p" style="width: 80%">
    <div class="card">
        <div class="card-header">
            <div class="d-flex">
                <h4 class="card-title">Characters</h4>
                <div class="d-flex ms-auto">
                    <SearchBar items="{characters}" key="name" on:filtered={filterCharacters}></SearchBar>
                </div>
            </div>
            <p class="card-subtitle mb-2 text-muted">So many to choose from!</p>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Add characters
                </button>
                <ul class="dropdown-menu">
                    {#each characters as character}
                        <li on:click={addToFavorites(character)}><a class="dropdown-item" href="#">{character.name}</a></li>
                    {/each}
                </ul>
            </div>
            <button type="button" class="btn btn-primary" on:click={Login}>Login</button>
        </div>
        <div class="card-body">
            {#each filteredCharacters as character}
                {#if isFavorite(character)}
                    <div class="card" style="width: 250px">
                        <div class="card-header container">

                            <div class="row">
                                <div class="col">
                                    <img class="img-thumbnail rounded"
                                         src="{'./images/'+character.image}"
                                         alt="{character.name}_icon"
                                         style="width: 125px"
                                    />
                                </div>
                                <div class="col">
                                    <p><strong>Progress</strong></p>
                                    <p>
                                        <span>1</span>
                                        <span>-></span>
                                        <span>90</span>
                                    </p>

                                </div>

                            </div>
                            <p class="card-title">{character.name}</p>


                        </div>
                    </div>
                    <div style="width: 125px; display: inline-block" class="me-2">
                        <p>{character.name}</p>
                        <button
                                type="button"
                                class="btn"
                                on:click={() => removeFromFavorites(character)}
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <img class="img-thumbnail rounded"
                             src="{'./images/'+character.image}"
                             alt="{character.name}_icon"
                        />
                        {#each character.materials as material}
                                <span>
                                  <img style="width: 25px"
                                       class="rounded"
                                       src="{getMaterialImage(material)}"
                                       alt="{material.name}"
                                  />
                                    {getCollectedMaterial(material)}/{material.needed}
                                </span>
                        {/each}
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>




