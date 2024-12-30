import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import NotFound from "../views/pages/NotFound.vue"
import Dashboard from "../views/pages/Dashboard.vue"
import Article from "../views/pages/Article.vue"

const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem("session_token");
    if (loggedIn) {
        next()
        return
    }

    next('/login')
}

const routes = [{
        path: "/",
        component: Home
    },
    {
        path: "/login",
        component: Login  },
    {
        path: "/article/:id",
        component: Article
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound
    },
    {
        path: "/dashboard",
        component: Dashboard,
        beforeEnter: ifAuthenticated
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;