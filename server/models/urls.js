const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const urlSchema = Schema({
  baseUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  }
})

const URL = mongoose.model('urlSchema', urlSchema)

module.exports = URL
