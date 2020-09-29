import { Movie } from '@/models/movie.model';

// 💡 : Exemple complet d'API : https://github.com/coding-blocks-archives/realworld-vue-typescript/blob/master/src/store/api.ts

export function getMovies(): Promise<Movie[]> {
    const movies: Movie[] = [
        {
            id: 1,
            title: 'TOP GUN',
            image: 'http://fr.web.img6.acsta.net/c_215_290/pictures/15/06/12/12/58/422779.jpg',
            date: '17 septembre 1986',
            tags: ['Action', 'Drame', 'Romance'],
            content: `Jeune as du pilotage et tête brûlée d'une école réservée à l'élite de l'aéronavale US ("Top Gun"), Pete Mitchell, dit "Maverick", tombe sous le charme d'une instructrice alors qu'il est en compétition pour le titre du meilleur pilote...`,
            isFavorite: false,
        },
        {
            id: 2,
            title: 'Star Wars : Episode III - La Revanche des Sith',
            image: 'http://fr.web.img4.acsta.net/c_215_290/medias/nmedia/18/35/53/23/18423997.jpg',
            date: '18 mai 2005',
            tags: ['Aventure', 'Action', 'Science fiction'],
            content: `La Guerre des Clones fait rage. Une franche hostilité oppose désormais le Chancelier Palpatine au Conseil Jedi. Anakin Skywalker,
                    jeune Chevalier Jedi pris entre deux feux, hésite sur la conduite à tenir. Séduit par la promesse d'un pouvoir sans précédent,
                    tenté par le côté obscur de la Force, il prête allégeance au maléfique Darth Sidious et devient Dark Vador. Les Seigneurs
                    Sith s'unissent alors pour préparer leur revanche, qui commence par l'extermination des Jedi. Seuls rescapés du massacre,
                    Yoda et Obi Wan se lancent à la poursuite des Sith. La traque se conclut par un spectaculaire combat au sabre entre Anakin
                    et Obi Wan, qui décidera du sort de la galaxie.`,
            isFavorite: false,
        },
        {
            id: 3,
            title: 'Deadpool',
            image: 'http://fr.web.img5.acsta.net/c_215_290/pictures/16/01/19/16/49/249124.jpg',
            date: '10 février 2016',
            tags: ['Comédie', 'Action', 'Fantastique'],
            content: `Deadpool, est l'anti-héros le plus atypique de l'univers Marvel. A l'origine, il s'appelle Wade Wilson : un ancien militaire
                    des Forces Spéciales devenu mercenaire. Après avoir subi une expérimentation hors norme qui va accélérer ses pouvoirs de
                    guérison, il va devenir Deadpool. Armé de ses nouvelles capacités et d'un humour noir survolté, Deadpool va traquer l'homme
                    qui a bien failli anéantir sa vie.`,
            isFavorite: false,
        },
    ].map(movie => ({ ...movie, isEditing: false, isVisible: true }));

    return new Promise(resolve => {
        setTimeout(() => resolve(movies), 300);
    });
}
