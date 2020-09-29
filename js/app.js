console.log(Vue.version);

// TODOS :
// This exercice will show us how to easily use directives.
// ✅ 1.  Create a new array for your movies
// ✅ 2.  Display this array as a loop in your template
// ✅ 3.  Create a form that allows us to create a movie
// ✅ 4.  Display a pen icon next to the title's movie.
// ✅ 5.  When clicked we must have the ability to edit movie
// ✅ 6.  Write a method that toggles the value of isFavorite.
// ✅ 7.  Bind the click on the star icon button to toggle favorite state.
// ✅ 8. We want to bind a  isFavorite  class to this button to indicate the favorite state.
// ✅ 9.  Display the list of genres in tags
// ✅ 10. In the form, we want to trigger user input & assign it to a model. The user can trigger a research by pressing enter.

const vm = new Vue({
    el: '#app',
    data: {
        title: 'Hello ciné',
        newMovie: {
            title: '',
            image: '',
            date: '',
            content: '',
            tags: [],
            isEditing: false,
            isVisible: true,
        },
        movies: [
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
        ].map(movie => ({...movie, isEditing: false, isVisible: true})),
        searchText: ''
    },
    methods: {
        addMovie(newMovie) {
            const nextId = Math.max(...this.movies.map(movie => movie.id)) + 1;
            this.movies = [...this.movies, {...newMovie, id: nextId}];
            this.newMovie = {...this.newMovie, title: '', image: '', date: '', content: ''};
        },
        editMovie(movie) {
            this.movies = this.movies.map(m => ({...m, isEditing: m.id === movie.id}));
        },
        saveEditedMovie(editedMovie) {
            this.movies = this.movies
                .map(movie => movie.id === editedMovie.id ? editedMovie : movie)
                .map(movie => ({...movie, isEditing: false}));
        },
        toggleFavorite(movie) {
            movie.isFavorite = !movie.isFavorite;
        },
        filter(search) {
            this.movies = this.movies.map(movie => ({
                ...movie,
                isVisible: movie.title.toUpperCase().includes(search.toUpperCase())
            }));
        }
    },
    computed: {
        visibleMovies() {
            return this.movies.filter(movie => movie.isVisible);
        }
        // 💡 : Possibilité de définir 1 getter et 1 setter sur 1 computed (base = c'est 1 getter)
    },
    watch: {
        // 🚨: à voir :-)
    },
    beforeCreate() {
        // Les data ne sont pas encore renseignées 🛑
        console.log('beforeCreate', this.title, this.$el); // => undefined
    },
    created() {
        // Les data sont renseignées ✅
        console.log('created', this.title, this.$el); // => 'Hello ciné'
    },
    beforeMount() {
        // this.$el = element avec les moustaches {{...}} dans le template
        console.log('beforeMount', this.title, this.$el);
    },
    mounted() {
        // this.$el = element avec les valeurs interprétées dans le template
        console.log('mounted', this.title, this.$el);
    },
    beforeUpdate() {
        // 🚨: à voir :-)
    },
    updated() {
        // 🚨: à voir :-)
    },
    beforeDestroy() {
        console.log('beforeDestroy', this.title, this.$el);
    },
    destroyed() {
        console.log('destroyed', this.title, this.$el);
    },
});

