console.log(Vue.version);

// Jour 1 :
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

// Jour 2 :
// ✅ In this exercise we'll create a  movie-card  component that will only display some text.
// ✅ 1. Declare a  movie-card component using the  Vue.component method. This component must contain:
//      ✅ a title
//      ✅ a description
//      ✅ an image
//      ✅ a date of creation
//      ✅ a list of genres
//      ⏳ a boolean 'isFavorite'
// ✅ 2. Create a  template  for our component. For now, only display textual data.
// ✅ 3. Let's now pass the content mentioned above as props to our component. Display each prop values accordingly using interpolation.
// ✅ 4. Using  isFavorite , we want to display the computed property {{ title }} starred!
//    or {{ title }} not starred! based on the value of the boolean.
// ✅ 5. In order to simulate a real-world example, you must mock your data into a file named  js/api.js .
//    You  can  access  these  values  via  the  mockData object.  Use  your  newly  created  component  to
//    display three cards in your template. Don't forget to give them prop values.
// ✅ 6. Create a new component for search section.
// ✅ 7. You must create a communication bond between your card components & your search component.

Vue.component('search-bar', {
    data: function () {
        return {
            searchText: '',
        }
    },
    methods: {},
    template: `
<div class="field">
    <label class="label">Search</label>
    <div class="control">
        <input @keyup.enter="$emit('search', searchText)" class="input" type="text" placeholder=""
               v-model.trim="searchText">
    </div>
</div>
`
});

Vue.component('movie-card', {
    props: ['movie'],
    computed: {
        title() {
            return this.movie.isFavorite ? `${this.movie.title} - ⭐️` : this.movie.title;
        }
    },
    methods: {
        toggleFavorite(movie) {
            movie.isFavorite = !movie.isFavorite;
        },
    },
    template: `
<div class="card card-result">
    <div class="card-header">
        <p class="card-header-title">
            <span v-if="!movie.isEditing">{{ movie.id }} - {{ title }}</span>
            <input v-else type="text" v-model="movie.title">
            <i v-if="!movie.isEditing" class="fa fa-edit" @click="$emit('edit-movie')"></i>
            <i v-else class="fa fa-save" @click="$emit('save-movie', movie)"></i>
        </p>
        <a class="card-header-icon">
            <span class="icon" :class="{'is-favorite': movie.isFavorite}"
                  @click="toggleFavorite(movie)">
              <i class="fa fa-star"></i>
            </span>
        </a>
    </div>
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-128x200">
                    <img :src="movie.image" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <p>{{ movie.date }}</p>
                <p class="tags">
                    <span class="tag" v-for="tag in movie.tags">{{ tag }}</span>
                </p>
                <div class="content" v-if="!movie.isEditing">{{ movie.content }}</div>
                <div class="content" v-else><textarea v-model="movie.content"></textarea></div>
            </div>
        </div>
    </div>
</div>
`,
});

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
        movies: []
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
        filter(search) {
            this.movies = this.movies.map(movie => ({
                ...movie,
                isVisible: movie.title.toUpperCase().includes(search.toUpperCase())
            }));
        }
    },
    // 🚨: Les computed ne doivent pas modifier les données (ce sont juste des getters)
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
        // 💡 : Les appels d'API se font dans le 'created' ou 'beforeMount'
        getMovies().then(movies => this.movies = movies);

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

