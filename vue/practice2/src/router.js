import {  createWebHistory, createRouter } from "vue-router";
import List from './components/List.vue';
import Contact from './components/Contact.vue';
import Detail from './components/Detail.vue';
import Author from './components/Author.vue';

const routes = [
    {
        path: "/list",
        name: 'list',
        component: List
    },
    {
        path: "/detail/:id",
        name: 'detail',
        components: {
            default: Detail
        },
        props: {
            default: true
        },
        children: [
            {
                path: 'author', component: Author
            }
        ]
    },
    {
        path: "/contact",
        name: 'contact',
        component: Contact
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;