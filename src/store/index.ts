import Vue from 'vue';
import Vuex from 'vuex';
import { Movie } from '@/models/movie.model';
import { fetchMovies } from '@/data/movies.api';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        movies: [],
        moviesLoading: false,
    },
    // 💡 : Des appels aux API (asynchrones) peuvent se faire dans les actions
    // 💡 : Tous les appels API qui doivent mettre à jour le store doivent être rangés ici au niveau des actions
    // 💡 : Une action peut déclancher plusieurs mutations
    // 💡 : Une action d'un module peut déclancher des actions d'autres modules
    // 💡 : pour déclancher une action : `store.dispatch('setMovies')`
    actions: {
        async loadMovies({ commit }) {
            commit('setMoviesLoading', true);
            commit('setMovies', await fetchMovies());
            commit('setMoviesLoading', false);
        },
        setMovieFavorite(context) {
            context.commit('setMovieFavorite');
        },
    },
    // 💡 : les mutations ne retournent rien
    // 💡 : les mutations sont des fonctions synchrones
    // 💡 : les mutations ne doivent pas réafecter la variable
    mutations: {
        setMoviesLoading(state, loading: boolean) {
            state.moviesLoading = loading;
        },

        setMovies(state, movies) {
            state.movies = movies;
        },

        // setMovieFavorite(state, movie, isFavorite) {
        //     return state;
        // },
    },
    getters: {
        getFavoritesMovies: state => state.movies.filter((movie: Movie) => movie.isFavorite),
        countFavoritesMovies: (state, getters) => getters.getFavoritesMovies.length,
        getMovieById: state => (id: number) => state.movies.find((movie: Movie) => movie.id === id),
        getMovies: state => state.movies.map((movie: Movie) => ({ ...movie, isVisible: true, isEditing: false })),
    },
    // 💡 : 3/4/5 modules dans une app' (pas rare)
    // 💡 : Il est possible de ranger les modules avec des 'namespace' (boolean) => 👍
    modules: {},
});
