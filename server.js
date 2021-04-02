const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const indexRouter = require('./app/routes/home.routes')

const app = express()

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// view engine setup
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')


// simple route
app.use('/', indexRouter)

require('./app/routes/tamu.routes')(app)

// set path for static assets
app.use(express.static(path.join(__dirname, 'app/public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500)
  res.render('pages/error', { status: err.status, message: err.message })
})

// set port
const port = process.env.PORT || 8000

// listen for request
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
)

module.exports = app
