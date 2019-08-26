import Vue from 'vue'
import Router from 'vue-router'
import CreatePost from './components/_post/CreatePost'
import SinglePost from './components/_post/SinglePost'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import authentication from './services/authentication'
import {BLOG_EDIT, BLOG_CREATE} from './collections/permissions.collection'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/post/create',
            name: 'CreatePost',
            meta: {permission: BLOG_CREATE},
            component: CreatePost
        },
        {
            path: '/post/edit/:id',
            name: 'EditPost',
            meta: {permission: BLOG_EDIT},
            component: CreatePost
        },
        {
            path: '/post/:id',
            name: 'ShowPost',
            component: SinglePost
        },
        {
            path: '/user/signup',
            name: 'Signup',
            component: Signup
        }

    ]
})

router.beforeEach((to, from, next) => {
    authentication.canAccess(to.meta.permission)
        .then(() => next())
        .catch(e => {
            if (authentication.isUserLogged) {
                next('/')
                return
            }
            next('/login')
        })
    next()
})

export default router