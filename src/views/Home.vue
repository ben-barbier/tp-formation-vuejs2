<template>
    <div class="home">
        <div class="container" style="background: #fdcb6e;">
            <nav class="navbar">
                <div class="navbar-brand">
                    <a class="navbar-item" href="index.html">
                        {{ title }}
                    </a>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item is-active" href="index.html">Search</a>
                    </div>
                </div>
            </nav>
        </div>

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
                    ></movie-card>

                    <div class="card card-result">
                        <div class="card-header">
                            <p class="card-header-title">Ajouter un film</p>
                        </div>
                        <div class="card-content">
                            <form @submit.prevent="addMovie(newMovie)">
                                <label style="display: inline-block; width: 150px" for="title">Titre</label>
                                <input id="title" v-model="newMovie.title" type="text" />
                                <br />
                                <br />
                                <label style="display: inline-block; width: 150px" for="desc">Description</label>
                                <input id="desc" v-model="newMovie.content" type="text" />
                                <br />
                                <br />
                                <label style="display: inline-block; width: 150px" for="img">Image</label>
                                <input id="img" v-model="newMovie.image" type="text" />
                                <br />
                                <br />
                                <label style="display: inline-block; width: 150px" for="released">Date</label>
                                <input id="released" v-model="newMovie.date" type="text" />
                                <br />
                                <br />
                                <button type="submit">Sauvegarder</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { getMovies } from '@/data/api';
import MovieCard from '@/components/MovieCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Movie } from '@/models/movie.model';

@Component({
    components: {
        MovieCard,
        SearchBar,
    },
})
export default class Home extends Vue {
    title = 'Hello ciné';
    movies: Movie[] = [];
    newMovie: Movie = {
        title: '',
        image: '',
        date: '',
        content: '',
        tags: [],
        isEditing: false,
        isVisible: true,
        isFavorite: false,
    };

    addMovie(newMovie: Movie) {
        const nextId = Math.max(...this.movies.map(movie => movie.id || 0)) + 1;
        this.movies = [...this.movies, { ...newMovie, id: nextId }];
        this.newMovie = { ...this.newMovie, title: '', image: '', date: '', content: '' };
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

    // watch: {
    //     // TODO: 🚨: à voir :-)
    // },

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
        this.movies = await getMovies();

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

    // --------------------------------------------------------------- //
    // ----------------- ⏱ Life Cycle hooks ⏱ (fin) ----------------- //
    // --------------------------------------------------------------- //
}
</script>

<!-- 💡 : Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navbar-item.is-active {
    color: #fdcb6e !important;
}

.card-result {
    margin-bottom: 20px;
}
</style>