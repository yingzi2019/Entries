// 导出函数，并在每次渲染时进行调用
import { createApp } from './app.js'

// const isDev = process.env.NODE_ENV !== 'production'

// comtext 是后端返回的对象
export default context => {
  // 因为有可能会是异步路由钩子函数或者组件，所以我们返回一个promise，
  // 以便服务daunt能够等待所有的内容在渲染前就已经准备就绪
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      /* eslint-disable */
      return reject({ 'url': fullPath })
    }
    // 设置服务端router 的位置
    router.push(context.url)

    // 等待router将可能的异步组件和钩子函数解析完成
    router.onReady(() => {
      // 获取所有组件
      const matchedComponents = router.getMatchedComponents()
      // 匹配办不到的路由执行reject函数，并返回404
      if (!matchedComponents.length) {
        /* eslint-disable */
        return reject({code: 404})
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      }))
        .then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state
          // promise 应该resolve应用程序实例，以便其进行渲染
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
