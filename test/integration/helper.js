var mongoose = require('mongoose');

module.exports.start = function(cb) {
    mongoose.connect('mongodb://localhost/rolling-migration', cb);
};