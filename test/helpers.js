var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.start = function(cb) {
    mongoose.connect('mongodb://localhost/rolling-migration', cb);
};

// Definition
var TestSchema = new Schema({
    type: String,
});
module.exports.TestModel = mongoose.model('testModel', TestSchema);
