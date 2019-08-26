import Vue from 'vue'
import Router from 'vue-router'
import CreatePost from './components/_post/CreatePost'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import authentication from './services/authentication'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/post/create',
            name: 'CreatePost',
            component: CreatePost
        },
        {
            path: '/post/edit/:id',
            name: 'EditPost',
            component: CreatePost
        }

    ]
})

router.beforeEach((to, from, next) => {
    authentication.canAccess()
        .then(() => next())
        .catch()
    next()
})

export default router