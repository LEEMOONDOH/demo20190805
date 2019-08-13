import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/system/login'
import Register from '@/views/system/register'
import Home from '@/views/home/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: '/register',
        name: 'Register',
        component: Register
      }]
    }
  ]
})
