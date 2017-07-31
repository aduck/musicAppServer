const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*"
  })
  next()
})
app.use(express.static(__dirname + '/public'))
app.use(router)
app.use((req, res, next) => {
  let error = new Error('NOT FOUND')
  error.status = 404
  next(error)
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'something wrong')
})
module.exports = app