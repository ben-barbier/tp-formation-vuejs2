<template>
    <div class="container" style="background: #fdcb6e;">
        <nav class="navbar">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">{{ title }}</router-link>
            </div>
            <div class="navbar-menu">
                <router-link to="/about" class="navbar-item">About</router-link>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavMenu extends Vue {
    @Prop({ default: '' }) title!: string;
}
</script>

<style scoped lang="scss">
.navbar-item.is-active {
    color: #fdcb6e !important;
}
</style>
