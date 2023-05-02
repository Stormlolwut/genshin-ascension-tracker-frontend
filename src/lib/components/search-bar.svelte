<script lang="ts">

    import {createEventDispatcher} from "svelte";

    export let items: Array<object | string> = []
    export let key = ''

    const dispatch = createEventDispatcher()
    const filter = (e) => {
        const search = e.target.value;
        if (search === '') return dispatch('filtered', {items: items});

        let filtered = []

        if (items[0] instanceof String) {
            filtered = items.filter((item: string) => item.toLowerCase().includes(search.toLowerCase()))
        } else if (Array.isArray(items)) {
            filtered = items.filter((item) => item[key].toLowerCase().includes(search.toLowerCase()))
        }

        dispatch('filtered', {items: filtered});
    };

</script>
<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" on:input={filter}>
