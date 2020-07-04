import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index'
import { createStore } from './store/index.js'
import { sync } from 'vuex-router-sync'

// 创建工厂函数，禁止实例
export function createApp () {
  // 创建router与store的实例
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store， 通过store.router.path,query,params,获取路由数据
  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  // 为什么要返回router呢？ 获取路由信息
  return { app, router, store }
}
