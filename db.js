let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let url = "mongodb://localhost/url-creater" 

if(process.env.NODE_ENV === 'production'){
  url = "mongodb://hristijankiko:test@ds113938.mlab.com:13938/short-url";
};

mongoose.connect(url);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + url);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});

require('./models/shortUrl');
