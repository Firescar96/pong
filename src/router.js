import VueRouter from 'vue-router'
import Pong from '@/components/Pong'
import Home from '@/components/Home'

export default new VueRouter({
  mode:   'history',
  routes: [
    { path: '/:gameID', component: Pong },
    { path: '/', component: Home },
    { path: '*', component: Home },
  ],
})