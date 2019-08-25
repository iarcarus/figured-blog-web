import Vue from 'vue'
import Router from 'vue-router'
import Blog from './pages/Blog.vue'
import CreatePost from './components/_post/CreatePost'
import About from './pages/About.vue'
import Login from './pages/Login.vue'
import authentication from './services/authentication'

Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'blog',
            component: Blog
        },
        {
            path: '/about',
            name: 'about',
            component: About
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
    next()
})

export default router