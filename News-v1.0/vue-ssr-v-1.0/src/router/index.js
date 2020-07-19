import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

// 切割路由
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/a',
        name: 'a',
        component: () => import('@/components/test/Home.vue'),
        meta: {index: 'a-home'}
      }, {
        path: '/b',
        name: 'b',
        component: () => import('@/components/test/item.vue'),
        meta: {index: 'b-home'}
      }, {
        path: '/c',
        name: 'c',
        component: () => import('@/components/test/fooCount.vue'),
        meta: {index: 'c-home'}
      }
    ]
  })
}

export const router = createRouter()
