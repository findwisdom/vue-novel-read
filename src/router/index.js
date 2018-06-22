import Vue from 'vue'
import Router from 'vue-router'
import reader from '@/page/reader'
import home from '@/page/home'

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
    }
  ]
})
