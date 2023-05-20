<script lang="ts">
    import type {Character} from "../../models/character"
    import type {CharacterStats} from "../../models/character-stats";

    import {createEventDispatcher, onDestroy, onMount} from "svelte"

    export let character: Character
    export let characterStats: CharacterStats

    const createEventDispatch = new createEventDispatcher()

    let modalInstance
    let Modal

    onMount(async () => {
        Modal = (await import('bootstrap')).Modal
    })

    onDestroy(() => {
        if (modalInstance) {
            modalInstance.dispose()
        }
    });

    let showModal = () => {
        const modalElement = document.getElementById('statsModal')
        if (!modalInstance) {
            modalInstance = new Modal(modalElement)
        }
        modalInstance.show();
    }


    function remove() {
        createEventDispatch("remove", {
            character: character,
            stats: characterStats
        })
    }

    function edit() {
        showModal()
    }

    function statsUpdate() {
        createEventDispatch("statsUpdate", {
            character: character,
            stats: characterStats
        })
    }

    //TODO: Emit event for editing

    //TODO: show items needed
    //TODO: show items gotten
    //TODO: checkout the items that are complete
    //TODO: check the items in order so the user can see how much he needs for each character in that order.
</script>

<!-- Stats modal -->
<div class="modal fade" id="statsModal" tabindex="-1" aria-labelledby="statsModalLabel" aria-hidden="false">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="statsModalLabel">Edit stats: {character.name}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form on:submit={statsUpdate}>
                <div class="modal-body">
                    <h4>Level</h4>
                    <label>Current
                        <input bind:value={characterStats.talent.current} class="form-control me-2" type="number">
                    </label>

                    <label class="mt-2">Desired
                        <input bind:value={characterStats.talent.preferred} class="form-control me-2" type="number">
                    </label>
                </div>
                <div class="modal-footer">
                    <button class="btn   btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Character card -->
<div class="card ms-1 me-1" style="width: 350px">
    <div class="card-header container">
        <div class="row">
            <div class="col d-flex flex-column justify-content-center align-items-center">
                <img class="img-thumbnail rounded"
                     src="{'./images/'+character.image}"
                     alt="{character.name}_icon"
                     style="width: 125px"
                />
                <strong class="card-title">{character.name}</strong>
            </div>
            <div class="col">
                <strong>Progress</strong>
                <div class="mb-1 row">
                    <div class="col d-flex justify-content-between">
                        <span>{characterStats.talent.current}</span>
                        <i class="bi bi-arrow-right"></i>
                        <span>{characterStats.talent.preferred}</span>
                    </div>
                    <!-- We add an empty coll here so that we align our progress div with our talents div -->
                    <div class="col d-flex justify-content-between"></div>
                </div>
                <strong>Talents</strong>
                {#each characterStats.stats as stat}
                <div class="mb-1 row">
                    <div class="col d-flex justify-content-between">
                        <span>{stat.current}</span>
                        <i class="bi bi-arrow-right"></i>
                        <span>{stat.preferred}</span>
                    </div>
                    <div class="col d-flex justify-content-between">
                        <span style="color: gray">{stat.type}</span>
                    </div>
                </div>
                {/each}
            </div>
        </div>
        <hr>
        <p>bruv this is a body</p>
        <hr>
        <div class="d-flex justify-content-around">
            <i on:keydown on:click={remove} class="bi bi-trash-fill" style="cursor: pointer; font-size: 1.5rem"></i>
            <i on:keydown on:click={edit} class="bi bi-pencil-fill" style="cursor: pointer; font-size: 1.5rem"></i>
        </div>
    </div>
</div>
