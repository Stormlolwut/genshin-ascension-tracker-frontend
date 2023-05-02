<script lang="ts">
  import "../../scss/styles.scss";

  import materialsJson from '$lib/data/materials.json'
  import userJson from '$lib/data/user.json'
  import NavBar from "$lib/components/nav-bar.svelte"
  import SearchBar from '$lib/components/search-bar.svelte'

  import type { Material } from "../../models/material"
  import type { User } from "../../models/user"

  import { inventory } from "../../endpoints/inventory"
  import { onMount } from "svelte"

  let filteredMaterials: Array<Material> = materialsJson;
  let materials: Array<Material> = materialsJson;
  let user: User = userJson;

  // TODO: use +page.server.ts to retrieve
  onMount(async () =>{
    user.inventory = await inventory.retrieve();
    filteredMaterials = filteredMaterials
  })

  const updateInventory = (async () => {
    await inventory.update(user.inventory);
  })
  const getInventoryItems = (index: number) => {
    return user.inventory.find(item => item.id === index)?.collected;
  }
  const filterMaterials = (event: CustomEvent) => {
    filteredMaterials = event.detail.items
  }
  const updateItem = (id: number, event: CustomEvent)  => {
    const itemIndex = user.inventory.findIndex(item => item.id === id)

    if (itemIndex === -1) return user.inventory.push({id, collected: parseInt((event.target as HTMLInputElement).value)})

    user.inventory[itemIndex].collected = parseInt((event.target as HTMLInputElement).value)
  }

</script>
<NavBar></NavBar>
<div class="mx-auto p" style="width: 1200px">
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
          <input type="number" class="form-control" placeholder="0" on:blur={updateInventory} on:change={(event) => updateItem(material.id, event)} value="{getInventoryItems(material.id)}" />
        </div>
      {/each}
    </div>
  </div>
</div>
