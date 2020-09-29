<template>
    <div id="app">
        <nav-menu :title="title"></nav-menu>
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavMenu from '@/components/NavMenu.vue';

@Component({
    components: {
        NavMenu,
    },
})
export default class App extends Vue {
    title = 'Hello ciné';
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
