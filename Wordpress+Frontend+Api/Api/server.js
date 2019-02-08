var express = require('express')
var app = express()

console.log(process.env.NODE_ENV)

app.get('/', function (req, res) {
  res.send('🖖')
})

app.listen(3001, (error) => {
  if (error) {
    console.log(error)
  }
  console.info('Express is listening on port %s.', 3001)
})
