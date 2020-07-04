// const app = new Vue({
//     template: `<div>Hello Word {{ text }}</div>`,
//     data () {return { text: '2111' }}
// })

const Vue = require('vue')
import App from './src/App.vue'

module.exports = function createApp (context={}) {
    const app =  new Vue({
      render: h => h(App)
      // data () { return {text: '我是张国强', context} }
    })
    return { app }
}
// export function createApp (context={}) {
//     const app =  new Vue({
//       render: h => h(App)
//       // data () { return {text: '我是张国强', context} }
//     })
//     return { app }
// }

