<script lang="ts">
    import "../scss/styles.scss"

    import type {Character} from "../models/character"
    import type {User} from "../models/user"
    import type {Material} from "../models/material"

    import NavBar from "$lib/components/nav-bar.svelte"
    import SearchBar from "$lib/components/search-bar.svelte"
    import AlertToast from "$lib/components/alert-toast.svelte"
    import CharacterCard from "$lib/components/character-card.svelte"

    import charactersJson from "$lib/data/characters.json"
    import userJson from "$lib/data/user.json"
    import materialsJson from "$lib/data/materials.json"

    import {onMount} from "svelte";

    import {inventory} from "../endpoints/inventory";
    import {favorites} from "../endpoints/favorites";

    const characters: Array<Character> = charactersJson
    const materials: Array<Material> = materialsJson

    const user: User = userJson

    let filteredCharacters: Array<Character> = charactersJson

    let toast: any;

    onMount(async () => {
        user.inventory = await toast.handleAsync(inventory.retrieve(), false, user.inventory);
        user.favorites = await toast.handleAsync(favorites.retrieve(), false, user.favorites);

        filteredCharacters = filteredCharacters
    })

    const addToFavorites = async (character) => {
        user.favorites.push(character.id)
        await toast.handleAsync(favorites.update(user.favorites), true)

        filteredCharacters = filteredCharacters
    }

    const removeFromFavorites = async (character) => {
        user.favorites = user.favorites.filter((id) => id !== character.id)
        await toast.handleAsync(favorites.update(user.favorites), true)

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
<AlertToast bind:this={toast}></AlertToast>
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
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    Add characters
                </button>
                <ul class="dropdown-menu">
                    {#each characters as character}
                        <li on:click={() => addToFavorites(character)}>
                            <a class="dropdown-item" href="#">{character.name}</a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="card-body">
            {#each filteredCharacters as character}
                {#if isFavorite(character)}
                    <CharacterCard bind:character={character} />
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




