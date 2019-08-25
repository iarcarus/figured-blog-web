import Vue from 'vue'
import Router from 'vue-router'
import Blog from './pages/Blog.vue'
import About from './pages/About.vue'
import Login from './pages/Login.vue'

Vue.use(Router)

export default new Router({
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
            name: 'login',
            component: Login
        }
    ]
})