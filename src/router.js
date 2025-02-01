import {createRouter, createWebHistory} from 'vue-router'
import Pong from '@/components/Pong.vue'
import Home from '@/components/Home.vue'

export default createRouter({
  history:   createWebHistory(),
  routes: [
    { path: '/:gameID', component: Pong },
    { path: '/', component: Home },
    { path: '/*', component: Home },
  ],
})