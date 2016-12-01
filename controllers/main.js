let mongoose = require('mongoose');
let ShortUrl = mongoose.model('ShortUrl');
let shortid = require('shortid');
let validUrl = require('valid-url');

module.exports.homepage = function(req, res){
  res.render('index');
};

module.exports.createLink = function(req, res){
  if(!req.params || !req.params[0] || !validUrl.isUri(req.params[0])){
    res.send("Please enter a valid  url format");
    return;
  }
  let _id = shortid.generate();
  let url = "http://localhost:3000/";
  if(process.env.NODE_ENV === "production"){
    url = "https://hristijanurl-shortener.herokuapp.com/";
  }
  ShortUrl.create({
    _id: _id,
    original_url: req.params[0],
    short_url: url + _id
  }, function(err, shortUrl){
    if(err){
      console.error(err);
    }
    res.json({
      original_url: shortUrl.original_url,
      short_url: shortUrl.short_url
    });
  });
};

module.exports.redirectToLink = function(req, res){
  if(!req.params || !req.params.shorturl) {
    res.send("Not found");
    return;
  }
  ShortUrl.findById(req.params.shorturl, function(err, document){
    if(document){
      if(err){
        console.log(err);
        res.send("Link was not found.");
        return;
      }
      console.log(document.original_url);
      res.redirect(document.original_url);
    } else {
      res.send("Short link not found.");
    }
  });
};