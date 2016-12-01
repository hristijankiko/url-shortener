var mongoose = require('mongoose');

var shortUrlSchema = new mongoose.Schema({
  "_id": {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  "original_url": String,
  "short_url": String
});

mongoose.model('ShortUrl', shortUrlSchema);