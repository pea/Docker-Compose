const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const routes = require('./routes')
const express = require('express')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const url = require('url')
const redirects = require('./redirects')

const handler = routes.getRequestHandler(app, ({ query, req, res, route }) => {
  app.render(req, res, route.page, query)
})

const redirectHandler = (req, res, next) => {
  redirects().forEach(({ from, to }) => {
    if (url.parse(req.url).pathname === from) {
      return res.status(301).redirect(to)
    }
  })
  next()
}

app.prepare().then(() => {
  express().use([redirectHandler, handler]).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
