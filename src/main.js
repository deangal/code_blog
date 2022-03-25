import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Blog from './components/Blog.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter);

const routes = [
 
  {path:'/',component: Login, props: true},
  {path:'/blog',component: Blog, props: true},

 
]
const router = new VueRouter({routes,})
Vue.config.productionTip = false

new Vue({
  
  render: h => h(App),
  router,
}).$mount('#app')
