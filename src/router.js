import {createRouter, createWebHistory} from 'vue-router'
import Pong from '@/components/Pong'
import Home from '@/components/Home'

export default createRouter({
  history:   createWebHistory(),
  routes: [
    { path: '/:gameID', component: Pong },
    { path: '/', component: Home },
    { path: '/*', component: Home },
  ],
})