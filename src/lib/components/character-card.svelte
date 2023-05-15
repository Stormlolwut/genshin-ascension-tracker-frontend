<script lang="ts">
    import type {Character} from "../../models/character";

    export let character: Character;

    //TODO: Emit event for editing
    //TODO: Emit event for removing

    //TODO: show items needed
    //TODO: show items gotten
    //TODO: checkout the items that are complete
    //TODO: check the items in order so the user can see how much he needs for each character in that order.
</script>
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
                        <span>1</span>
                        <i class="bi bi-arrow-right"></i>
                        <span>90</span>
                    </div>
                    <!-- We add an empty coll here so that we align our progress div with our talents div -->
                    <div class="col d-flex justify-content-between"></div>
                </div>
                <strong>Talents</strong>
                <div class="mb-1 row">
                    <div class="col d-flex justify-content-between">
                        <span>1</span>
                        <i class="bi bi-arrow-right"></i>
                        <span>90</span>
                    </div>
                    <div class="col d-flex justify-content-between">
                        <span style="color: gray" >Attack</span>
                    </div>
                </div>
                <div class="mb-1 row">
                    <div class="col d-flex justify-content-between">
                        <span>1</span>
                        <i class="bi bi-arrow-right"></i>
                        <span>90</span>
                    </div>
                    <div class="col d-flex justify-content-between">
                        <span style="color: gray" >Burst</span>
                    </div>
                </div>
                <div class="mb-1 row">
                    <div class="col d-flex justify-content-between">
                        <span>1</span>
                        <i class="bi bi-arrow-right"></i>
                        <span>90</span>
                    </div>
                    <div class="col d-flex justify-content-between">
                        <span style="color: gray" >Skill</span>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <p>bruv this is a body</p>
        <hr>
        <div class="d-flex justify-content-around">
            <i class="bi bi-trash-fill" style="cursor: pointer; font-size: 1.5rem"></i>
            <i class="bi bi-pencil-fill" style="cursor: pointer; font-size: 1.5rem"></i>
        </div>
    </div>
</div>
