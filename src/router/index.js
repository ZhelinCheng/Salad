import Vue from 'vue'
import Router from 'vue-router'
// import Examine from '@/components/examine'
import State from '@/components/state'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: State
  }]
})
