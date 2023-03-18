<script lang="ts">
  import "../../scss/styles.scss";

  import materialsJson from '$lib/data/materials.json';
  import userJson from '$lib/data/user.json';
  import NavBar from "$lib/components/nav-bar.svelte";
  import SearchBar from '$lib/components/search-bar.svelte'

  import type { Material } from "../../models/material";

  let filteredMaterials: Array<Material> = materialsJson;
  let materials: Array<Material> = materialsJson;

  const getInventoryItems = (index: number) => {
    return userJson.inventory.find(item => item.id === index)?.collected;
  }
  const filterMaterials = (event: CustomEvent) => {
    filteredMaterials = event.detail.items
  }

</script>
<NavBar></NavBar>
<div class="mx-auto p" style="width: 700px">
  <div class="card">
    <div class="card-header">
      <div class="d-flex">
        <h4 class="card-title">Inventory</h4>
        <div class="d-flex ms-auto">
          <SearchBar items="{materials}" key="name" on:filtered={filterMaterials}></SearchBar>
        </div>
      </div>
      <p class="card-subtitle mb-2 text-muted">Please fill in the materials that you have collected</p>
    </div>
    <div class="card-body">
      {#each filteredMaterials as material}
        <div style="width: 125px; display: inline-block" class="me-2">
          <p>{material.name}</p>
          <img class="img-thumbnail rounded mb-1" src="{material.image}" alt="{material.name}" />
          <input type="number" class="form-control" placeholder="0" value="{getInventoryItems(material.id)}" />
        </div>
      {/each}
    </div>
  </div>
</div>
