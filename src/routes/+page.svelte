<script lang="ts">
    //TODO: create a main page for the app that will be the entry point for the user and has the following features:
    // - a navbar
    // - a toast
    // - a switch between components is inside the same page
    import "../scss/styles.scss"

    import type {Character} from "../models/character"
    import type {User} from "../models/user"
    import type {Material} from "../models/material"
    import type {CharacterStatsData} from "../models/character-stats";

    import NavBar from "$lib/components/nav-bar.svelte"
    import SearchBar from "$lib/components/search-bar.svelte"
    import AlertToast from "$lib/components/alert-toast.svelte"
    import CharacterCard from "$lib/components/character-card.svelte"

    import {handleAsync} from "$lib/utils/toast-service";

    import charactersJson from "$lib/data/characters.json"
    import userJson from "$lib/data/user.json"
    import materialsJson from "$lib/data/materials.json"

    import {onMount} from "svelte";

    import {inventory} from "../endpoints/inventory";
    import {favorites} from "../endpoints/favorites";

    import {Level} from "../models/level";
    import {CharacterStats} from "../models/character-stats"

    const characters: Array<Character> = charactersJson
    const materials: Array<Material> = materialsJson

    const user: User = userJson

    let filteredCharacters: Array<Character> = charactersJson

    let toast: AlertToast;

    onMount(async () => {
        user.inventory = await handleAsync(inventory.retrieve(), []);
        user.favorites = await handleAsync(favorites.retrieve(), []);

        filteredCharacters = filteredCharacters
    })

    const addToFavorites = async (character) => {

        const stats = new Array<Level>()
        stats.push(new Level({current: 0, preferred: 6, type: "Attack"}))
        stats.push(new Level({current: 0, preferred: 6, type: "Burst"}))
        stats.push(new Level({current: 0, preferred: 6, type: "Skill"}))

        const emptyCharacterSheet: CharacterStatsData = {
            id: character.id,
            name: character.name,
            stats: stats,
            talent: new Level({current: 0, preferred: 90, type: "Talent"})
        }

        user.favorites.push(new CharacterStats(emptyCharacterSheet))
        await handleAsync(favorites.update(user.favorites), [], true)

        filteredCharacters = filteredCharacters
    }

    const removeFromFavorites = async (event: CustomEvent) => {
        const removedCharacter = event.detail.character
        user.favorites = user.favorites.filter((character) => character.id !== removedCharacter.id)

        await handleAsync(favorites.update(user.favorites), [], true)

        filteredCharacters = filteredCharacters
    }

    const isFavorite = (character) => {
        const result = user.favorites.find((stats) => stats.id === character.id)
        return result !== undefined
    }
    // We can't directly couple the object because since svelte wants to write to it aswell
    const getCharacterIndexForStats = (character) => {
        console.log(user.favorites)
        return  user.favorites.findIndex((stats) => stats.id === character.id);
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
                        <li on:keypress on:click={() => addToFavorites(character)}>
                            <div class="dropdown-item">{character.name}</div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="card-body d-flex flex-wrap justify-content-start">
            {#each filteredCharacters as character (character.id)}
                {#if isFavorite(character)}
                    <CharacterCard
                            on:remove={removeFromFavorites}
                            bind:characterStats={user.favorites[getCharacterIndexForStats(character)]}
                            bind:character={character}
                    />
                {/if}
            {/each}
        </div>
    </div>
</div>




