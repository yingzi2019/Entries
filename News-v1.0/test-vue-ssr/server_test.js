const fs = require('fs')
const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})
// const renderer = require('vue-server-renderer').createRenderer({
//     template: require('fs').readFileSync('./ssr-index.html', 'utf-8')
// })

const server = express()
const createApp = require('./src/app.js')

// context 为上下文变量，可进行替换插值，如双花括号，三花括号


// 在服务器中，默认禁用响应式数据，为了防止污染
// 在服务端渲染中只有 beforeCreate 和 created 两个生命周期函数被调用，其他，将会在客户端时得到执行
// 尽量避免使用 window 或 document 等的全局变量
// axios 是一个 HTTP 客户端, 尽量在生命周期钩子函数中惰性访问 API。

// renderer.renderToString(app, context, (err, html) => {{
//     console.log(html)  // 则将注入完整内容页面
// }})

express.get('*', (req, res) => {

  const contextoop = { url: req.url }
  const app = createApp(contextoop)
    // const app = new Vue({
    //   data: {
    //     url: req.url
    //   },
    //   template: '<div>访问的url是{{url}}</div>'
    // });

    renderer.renderToString(app, context, (err, html) => {
        // if (err) throw err
        if (err) {return res.status(500).end('运行错误！')}

        res.setHeader('Content-Type','text/html;charset=UTF-8');
        res.end(`<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>test-vue-s{{ title }}</title>
          </head>
          <body>
          {{ title }}
            ${html}
          </body>
        </html>
        `) 
    })
})

express.listen(8081)
