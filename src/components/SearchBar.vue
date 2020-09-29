<template>
    <div class="field">
        <label class="label">Search</label>
        <div class="control">
            <input @keyup.enter="$emit('search', searchText)" class="input" type="text" placeholder="" v-model.trim="searchText" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchBar extends Vue {
    searchText = '';
}
</script>
