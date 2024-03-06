import Category from "@/pages/Category.vue"
import Home from "@/pages/Home.vue"
import Search from "@/pages/Search.vue"

import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/category/:id',
        component: Category,
    },
    {
        path: '/search',
        component: Search
    }
]

export default createRouter({
    routes,
    history: createWebHistory(),
})

//new route - search
//query params
//search bar to template