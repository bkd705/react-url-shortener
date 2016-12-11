const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      path = require('path')

const app = express(),
      port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/data/db')
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => console.log('Connected to db at /data/db'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const urlRoutes = require('./routes/urlRoutes')
app.use('/url', urlRoutes)

app.listen(8080, () => console.log(`Listening on ${port}`))
