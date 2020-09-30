import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Movies from '../views/Home.vue';
import Favorites from '../views/Favorites.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Movies',
        component: Movies,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
    },
    {
        path: '/starred',
        redirect: '/favorites',
    },
    {
        path: '/*',
        redirect: '/',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
