export interface Movie {
    id?: number;
    title: string;
    image: string;
    creation: string;
    genres: string[];
    description: string;
    isFavorite: boolean;
    isEditing: boolean;
    isVisible: boolean;
}
