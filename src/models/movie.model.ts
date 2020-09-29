export interface Movie {
    id?: number;
    title: string;
    image: string;
    date: string;
    tags: string[];
    content: string;
    isFavorite: boolean;
    isEditing: boolean;
    isVisible: boolean;
}
