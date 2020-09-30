<template>
    <v-card class="MovieDetail">
        {{ movie }}
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { fetchMovie } from '@/data/movies.api';

@Component
export default class MovieDetail extends Vue {
    @Prop() id: number;
    movie: Movie = null;

    async beforeMount() {
        this.movie = await fetchMovie(this.id);
    }
}
</script>

<style scoped lang="scss">
.MovieDetail {
    max-width: 400px;
    margin: 20px;
}
</style>
