// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Bus from './utils/Bus'
import './utils/Bus'

Vue.config.productionTip = false

// Vue.prototype.$bus = Bus

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// // 1. 创建Vue实例
// const Vue = require('vue')
// const app = new Vue({
//   template: `${<App/>}`
// })

// // 2. 创建一个renderer 渲染器
// const renderer = require('vue-server-renderer').createRenderer

// // 3. 将实例渲染为html
// renderer.renderToString(app, (err, html) => {
//   if (err) throw err

//   console.log('err->', err)
//   console.log('html-->', html)

//   return html
// })

// // 3.1 在2.50+中， 如果没有传入回调函数，会返回Premise对象
// renderer.renderToString(app)
//   .then(html => {
//     console.log(html)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// export default {

// }
