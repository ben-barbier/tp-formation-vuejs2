<template>
    <v-card class="FavoriteMovie">
        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-text>
            {{ movie.description }}
        </v-card-text>
        <v-card-title>Genres</v-card-title>
        <v-card-text>
            <v-chip v-for="genre in movie.genres" :key="genre">{{ genre }}</v-chip>
        </v-card-text>
        <v-card-actions>
            <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }">
                <v-btn elevation="2" color="primary"> Edit</v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Movie } from '@/models/movie.model';

@Component
export default class FavoritesMovie extends Vue {
    @Prop() movie!: Movie;
}
</script>

<style scoped lang="scss">
.FavoriteMovie {
    max-width: 374px;
    margin: 20px;
}
</style>
