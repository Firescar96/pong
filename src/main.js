import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import router from './router'

Vue.use(VueRouter)
Vue.config.productionTip = false

console.log('router', router)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
