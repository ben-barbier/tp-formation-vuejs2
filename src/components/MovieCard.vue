<template>
    <div class="card card-result">
        <div class="card-header">
            <p class="card-header-title">
                <span v-if="!movie.isEditing">{{ movie.id }} - {{ title }}</span>
                <input v-else type="text" v-model="movie.title" />
                <i v-if="!movie.isEditing" class="fa fa-edit" @click="$emit('edit-movie')"></i>
                <i v-else class="fa fa-save" @click="$emit('save-movie', movie)"></i>
            </p>
            <a class="card-header-icon">
                <span class="icon" :class="{ 'is-favorite': movie.isFavorite }" @click="$emit('toggle-favorite')">
                    <i class="fa fa-star"></i>
                </span>
            </a>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x200">
                        <img :src="movie.image" alt="Image" />
                    </figure>
                </div>
                <div class="media-content">
                    <p>{{ movie.creation }}</p>
                    <p class="tags">
                        <span class="tag" v-for="genre in movie.genres" :key="genre">{{ genre }}</span>
                    </p>
                    <div class="content" v-if="!movie.isEditing">{{ movie.description }}</div>
                    <div class="content" v-else><textarea v-model="movie.description"></textarea></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Movie } from '@/models/movie.model';

@Component
export default class MovieCard extends Vue {
    // 🚨 : Il ne faut jamais modifier les props (c'est une mauvaise pratique !)
    // Un composant est responsable des éléments qu'il défini dans ses data
    // Si il doit modifier ce qui lui est passé par ses props, il doit remonter
    // la modification à son parent (et c'est le parent qui fait l'update API)
    @Prop() movie!: Movie;

    get title() {
        return this.movie.isFavorite ? `${this.movie.title} - ⭐️` : this.movie.title;
    }
}
</script>

<style scoped lang="scss">
.card-result {
    margin-bottom: 20px;
}

.is-128x200 {
    height: 200px;
    width: 128px;
}

.is-favorite {
    color: #ffdd57;
}
</style>
