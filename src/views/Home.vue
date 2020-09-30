<template>
    <div class="home">
        <section class="hero" style="background: #fdcb6e;">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{ title }}</h1>
                    <search-bar @search="filter($event)"></search-bar>

                    <!-- 💡 : Il est recommandé de fournir une key avec v-for chaque fois que possible -->
                    <movie-card
                        v-for="movie in visibleMovies"
                        :key="movie.id"
                        :movie="movie"
                        @edit-movie="editMovie(movie)"
                        @save-movie="saveEditedMovie($event)"
                        @toggle-favorite="toggleFavorite(movie)"
                    ></movie-card>

                    <add-movie @add-movie="addMovie($event)"></add-movie>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import MovieCard from '@/components/MovieCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import AddMovie from '@/components/AddMovie.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Movie } from '@/models/movie.model';
import { fetchMovies, updateMovieFavorite } from '@/data/movies.api';

@Component({
    components: {
        MovieCard,
        SearchBar,
        AddMovie,
    },
})
export default class Home extends Vue {
    title = 'Hello ciné';
    movies: Movie[] = [];

    addMovie(newMovie: Movie) {
        const nextId = Math.max(...this.movies.map(movie => movie.id || 0)) + 1;
        this.movies = [...this.movies, { ...newMovie, id: nextId }];
    }

    editMovie(movie: Movie) {
        this.movies = this.movies.map(m => ({ ...m, isEditing: m.id === movie.id }));
    }

    saveEditedMovie(editedMovie: Movie) {
        this.movies = this.movies
            .map(movie => (movie.id === editedMovie.id ? editedMovie : movie))
            .map(movie => ({
                ...movie,
                isEditing: false,
            }));
    }

    filter(search: string) {
        this.movies = this.movies.map(movie => ({
            ...movie,
            isVisible: movie.title.toUpperCase().includes(search.toUpperCase()),
        }));
    }

    // 🚨: Les "computed" (nom JS) ne doivent pas modifier les données
    get visibleMovies() {
        return this.movies.filter(movie => movie.isVisible);
    }

    async toggleFavorite(movie: Movie) {
        const updatedMovie = { ...movie, isFavorite: !movie.isFavorite };
        await updateMovieFavorite(updatedMovie.id, updatedMovie.isFavorite);
        this.saveEditedMovie(updatedMovie);
        if (updatedMovie.isFavorite) {
            this.$router.push({ name: 'MovieDetail', params: { id: movie.id } });
        }
    }

    watch() {
        // 🚨: Eviter au maximum l'utilisation du watch (ca s'execute à chaque cycle de détection du changement)
    }

    // --------------------------------------------------------------- //
    // -------------------- ⏱ Life Cycle hooks ⏱ -------------------- //
    // --------------------------------------------------------------- //
    beforeCreate() {
        // Les data ne sont pas encore renseignées 🛑
        console.log('beforeCreate', this.title, this.$el); // => undefined
    }

    created() {
        // Les data sont renseignées ✅
        console.log('created', this.title, this.$el); // => 'Hello ciné'
    }

    async beforeMount() {
        // 💡 : Les appels d'API se font dans le 'created' ou 'beforeMount'
        this.movies = await fetchMovies();
        this.movies = this.movies.map(movie => ({ ...movie, isVisible: true, isEditing: false }));

        // this.$el = element avec les moustaches {{...}} dans le template
        console.log('beforeMount', this.title, this.$el);
    }

    mounted() {
        // this.$el = element avec les valeurs interprétées dans le template
        console.log('mounted', this.title, this.$el);
    }

    beforeUpdate() {
        // TODO: 🚨 à voir :-)
    }

    updated() {
        // TODO: 🚨 à voir :-)
    }

    beforeDestroy() {
        console.log('beforeDestroy', this.title, this.$el);
    }

    destroyed() {
        console.log('destroyed', this.title, this.$el);
    }

    beforeRouteUpdated(to, from, next) {
        // Do something
    }

    // --------------------------------------------------------------- //
    // ----------------- ⏱ Life Cycle hooks ⏱ (fin) ----------------- //
    // --------------------------------------------------------------- //
}
</script>

<!-- 💡 : Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-result {
    margin-bottom: 20px;
}
</style>
