<template>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Movie } from '@/models/movie.model';

@Component
export default class AddMovie extends Vue {
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
        this.$emit('add-movie', newMovie);
        this.newMovie = { ...this.newMovie, title: '', image: '', date: '', content: '' };
    }
}
</script>
