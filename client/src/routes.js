import { createRouter, createWebHistory } from "vue-router";

import CategoryDetail from './components/site/category/Detail.vue';
import Posts from './components/site/post/List.vue';
import PostDetail from './components/site/post/Detail.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/category/:slug',
            name: 'CategoryDetail',
            component: CategoryDetail
        },
        {
            path: '/',
            name: 'Posts',
            component: Posts
        },
        {
            path: '/post/:slug',
            name: 'PostDetail',
            component: PostDetail
        }
    ]
});

export default router;