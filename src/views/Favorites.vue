<template>
    <div class="Favorites">
        <FavoritesMovie v-for="movie in movies" :key="movie.id" :movie="movie"></FavoritesMovie>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { fetchMovies } from '@/data/movies.api';
import FavoritesMovie from '@/components/FavoritesMovie.vue';
@Component({
    components: { FavoritesMovie },
})
export default class Favorites extends Vue {
    movies: Movie[] = [];

    async beforeMount() {
        this.movies = await fetchMovies();
        this.movies = this.movies.filter(movie => movie.isFavorite);
    }
}
</script>

<style scoped lang="scss">
.Favorites {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
