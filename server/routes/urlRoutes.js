const express = require('express'),
      mongoose = require('mongoose')

const app = express(),
      db = mongoose.connection

const URL = require('../models/urls')

app.get('/:shortUrl', (req, res) => {
  URL.findOne({ "shortUrl": req.params.shortUrl }, (err, entry) => {
    err ? res.send({ type: 'error', message: err }) : res.redirect(entry.baseUrl)
  })
})

app.post('/new', (req, res) => {
  const __url = req.body
  const newUrl = URL({
    baseUrl: __url.baseUrl,
    shortUrl: __url.shortUrl
  })

  newUrl.save(err => {
    if(err) {
      if(err.name === 'MongoError' && err.code === 11000) {
        return res.status(500).send({ type: 'error', message: 'Short URL already exists sorry!' })
      }
      return res.status(500).send(err)
    } else {
      res.send({ type: 'success', message: 'Short URL created!' })
    }
  })
})

app.get('/all', (req, res) => {
  URL.find({}, (err, urls) => {
    err ? res.send({ type: 'error', message: err }) : res.send({ urls })
  })
})

app.delete('/delete/:shortUrl', (req, res) => {
  URL.remove({ "shortUrl": req.params.shortUrl }, err => {
    err ? res.send({ type: 'error', message: err }) : res.send({ type: 'success', message: 'Short Url deleted successfully!' })
  })
})

module.exports = app
