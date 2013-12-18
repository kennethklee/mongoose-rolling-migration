var mocha = require('mocha'),
    mongoose = require('mongoose'),
    schema = mongoose.schema,
    plugin = require('../../lib/plugin');


describe('Plugin', function() {

    describe('Model.migrate', function() {
        it.skip('should migrate the current model', function(done) {
        });
    });

    describe('Schema.migrate', function() {
        it.skip('should mark the query for migration', function(done) {
        });

        it.skip('should mark the promise for migration', function(done) {
        });
    });
});