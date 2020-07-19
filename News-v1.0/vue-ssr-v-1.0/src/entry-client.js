// 客户端。创建程序，并将其挂载到DOM中
import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app.js'

// 一个全局混合，当路由组件的参数发生变化时调用`asyncData`
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    // console.log('before->router', this)
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next)
    } else {
      next()
    }
  }
})

// 客户端特定引导逻辑......
const { app, router, store } = createApp()

// 获取初始数据
// 获取类别信息
// !categoryCount && dispatch(LOAD_CATEGORIES_ASYNC),

// 使用服务器初始化时，状态会渲染到页面，
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 挂在DOM // 等待异步任务的完成
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    // 筛选
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    // 这里如果有加载指示器 (loading indicator)，就触发

    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    }))
      .then(() => {
        // 停止加载指示器(loading indicator)

        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})
