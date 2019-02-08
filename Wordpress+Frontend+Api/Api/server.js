var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('🖖')
})

app.listen(3001, (error) => {
  if (error) {
    console.log(error)
  }
  console.info('Express is listening on port %s.', 3001)
})
