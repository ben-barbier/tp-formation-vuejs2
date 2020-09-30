import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// 💡 : La seule vocation de l'instance est d'ajouter des librairies
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app');

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
// ✅ 5. In order to simulate a real-world example, you must mock your data into a file named  js/api.ts .
//    You  can  access  these  values  via  the  mockData object.  Use  your  newly  created  component  to
//    display three cards in your template. Don't forget to give them prop values.
// ✅ 6. Create a new component for search section.
// ✅ 7. You must create a communication bond between your card components & your search component.

// Jour 2 - Aprem :
// ✅ 1. Migration avec une version générée par vue-cli

// Jour 3 - Matin - Routing
// ✅ 1. Install  vue -router # Using npm
//      npm install  --save vue -router
// ✅ 1.  Create  a  new  route  named  'movies'  that  will  render  our  component.  This  route  has  to  match  the default path.
// ✅ 2.  Now we want to have a new route 'favorites' that will display our favorites movies. We also want a link to navigate to this component.
// ✅ 3.  This 'favorites' route has to be also aliased with '/starred'
// 4.  In  each  card,  we  would  like  to  have  a  navigation  button  to  navigate  to  a  new  route  that  displays details about the movie. The routes have to match with an ID that will be passed as a prop.
// 5.  When  a  user  clicks  to  favorite  a  movie,  we  also  want  the  app  to  redirect  him  to  the  details  of  the movie.

// Jour 3 - Aprem :
// ...
