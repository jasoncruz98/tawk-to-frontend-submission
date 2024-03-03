import Category from "@/pages/Category.vue"
import Home from "@/pages/Home.vue"

import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/category/:id',
        component: Category,
    }
]

export default createRouter({
    routes,
    history: createWebHistory(),
})