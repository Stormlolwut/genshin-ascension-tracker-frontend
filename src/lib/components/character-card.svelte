<script lang="ts">
    import type {Character} from "../../models/character";

    export let character: Character;

</script>
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
                <p><strong>Talents</strong></p>
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
