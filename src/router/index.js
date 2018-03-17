import Vue from 'vue'
import Router from 'vue-router'
// import Examine from '@/components/examine'
import State from '@/components/state'
import List from '@/components/list'
import Cdn from '@/components/cdn'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: State
    }, {
        path: '/examine/:classify',
        component: List,
        props: true
    }, {
        path: '/cdn',
        component: Cdn
    }]
})
