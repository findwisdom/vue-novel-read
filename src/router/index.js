import Vue from 'vue'
import Router from 'vue-router'
import reader from '@/page/reader'
import home from '@/page/home'
import search from '@/page/search'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/reader',
            name: 'reader',
            component: reader
        },
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/search',
            name: 'search',
            component: search
        }
    ]
})
