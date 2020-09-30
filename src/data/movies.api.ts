import axios from 'axios';
import { Movie } from '@/models/movie.model';

// 💡 : Exemple complet d'API : https://github.com/coding-blocks-archives/realworld-vue-typescript/blob/master/src/store/api.ts

export const moviesApi = axios.create({
    baseURL: 'http://localhost:4000/rest/movies',
});

export async function fetchMovies(): Promise<Movie[]> {
    const response = await moviesApi.get(`/`);
    return response.data;
}

export async function updateMovieFavorite(movieId: number, isFavorite: boolean): Promise<Movie> {
    const response = await moviesApi.post(`/${movieId}/favorites`, { isFavorite });
    return response.data;
}
