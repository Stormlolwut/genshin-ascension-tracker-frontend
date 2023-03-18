<script lang="ts">
  import "../scss/styles.scss";

  import type { Character } from "../models/character";
  import type { User } from "../models/user";
  import type { Material } from "../models/material";

  import NavBar from "$lib/components/nav-bar.svelte";
  import SearchBar from "$lib/components/search-bar.svelte";

  import charactersJson from "$lib/data/characters.json";
  import userJson from "$lib/data/user.json";
  import materialsJson from "$lib/data/materials.json";


  const characters: Array<Character> = charactersJson;
  const user: User = userJson;
  const materials: Array<Material> = materialsJson;

  let filteredCharacters: Array<Character> = charactersJson;
  const addToFavorites = (character) => {
    user.favorites.push(character.id)
    filteredCharacters = filteredCharacters
  };
  const isFavorite = (character) => user.favorites.includes(character?.id);

  const getMaterialImage = (material) => {
    return materials.find((mat) => mat.id === material.id)?.image;
  };
  const getCollectedMaterial = (material) => {
    return user.inventory.find((invMaterial) => invMaterial.id === material.id)?.collected;
  };
  const filterCharacters = (event: CustomEvent) => {
    filteredCharacters = event.detail.items;
  };
</script>
<NavBar></NavBar>
<div class="mx-auto p" style="width: 700px">
  <div class="card">
    <div class="card-header">
      <div class="d-flex">
        <h4 class="card-title">Characters</h4>
        <div class="d-flex ms-auto">
          <SearchBar items="{characters}" key="name" on:filtered={filterCharacters}></SearchBar>
        </div>
      </div>
      <p class="card-subtitle mb-2 text-muted">So many to choose from!</p>
    </div>
    <div class="card-body">
      <h5>Favorites</h5>
      {#each filteredCharacters as character}
        {#if isFavorite(character)}
          <div style="width: 125px; display: inline-block" class="me-2">
            <p>{character.name}</p>
            <img class="img-thumbnail rounded" src="{'./images/'+character.image}" alt="{character.name}_icon" />
            {#each character.materials as material}
            <span>
              <img style="width: 25px" class="rounded" src="{getMaterialImage(material)}" alt="{material.name}" />
              {getCollectedMaterial(material)}/{material.needed}
            </span>
            {/each}
          </div>
        {/if}
      {/each}
    </div>
    <div class="card-body" style="background-color: #f2f0f0">
      {#each filteredCharacters as character}
        {#if !isFavorite(character)}
          <div style="width: 125px; display: inline-block" class="me-2">
            <label>
              {character.name}
              <button
                type="button"
                class="btn btn-primary"
                on:click={() => addToFavorites(character)}
              >
                Add
              </button>
            </label>
            <img class="img-thumbnail rounded" src="{'images/'+character.image}" alt="yelan_icon" />
            {#each character.materials as material}
            <span>
              <img style="width: 25px" class="rounded" src="{getMaterialImage(material)}" alt="{material.name}" />
              {getCollectedMaterial(material)}/{material.needed}
            </span>
            {/each}
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>




