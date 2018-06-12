var mongoose = require('mongoose');
var mongoURI = 'mongodb://admin:password1@ds050189.mlab.com:50189/volunteer-rocks';
mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', function (err) {
  if (err) {
    throw err;
  }
});

db.once('open', function () {
  console.log('Volunteer Database is connected');
});

let disconnect = function () {
  mongoose.connection.close();
};

module.exports.dbConnect = db;
module.exports.disconnect = disconnect;