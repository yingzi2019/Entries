/* https://www.jb51.net/article/142811.htm */
const fs = require('fs')
const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const { minify } = require('html-minifier')

const resolve = file => path.resolve(__dirname, file)
  
const server = express()
// const createApp = require('./src/app.js')
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`


const templatePath = resolve('./ssr-index.html')
const isProd = true 
if (isProd) {
  /**
  生产环境，createRenderer将已经通过webpack打包好的server-bundle.js转化为一个可以操作的renderer对象。
  renderer = createRenderer(fs.readFileSync(resolve('./dist/server-bundle.js'), 'utf-8'))
  **/
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  /**
 入口模板文件
 indexHTML = parseIndex(fs.readFileSync(resolve('./dist/index.html'), 'utf-8'))
 **/
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template,
    clientManifest,
    basedir: resolve('./dist')
  })
} else {
  // 在开发环境中，进行热重载
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    server,
    templatePath,
    (bundle, options) => {
      renderer = createBundleRenderer(bundle, options)
    }
  )
}

// 判断中间件是否过期
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

// server.use('/', express.static('./dist'))
// server.use('/dist', express.static('./dist'))
server.use('/dist', serve('./dist', true))
server.use('/', serve('./dist', true))
server.use('/manifest.json', serve('./manifest.json', true))

function render (req, res) {
  const s = Date.now()

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(minify(html, { collapseWhitespace: true, minifyCSS: true}))
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

server.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

server.on('error', err => console.log(err))
server.listen(8082, () => {
  console.log(`vue ssr started at localhost: 8082`)
})

