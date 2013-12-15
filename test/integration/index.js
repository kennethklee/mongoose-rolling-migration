var mocha = require('mocha'),
    mongoose = require('mongoose'),
    helper = require('./helper'),
    migrate = require('../../');


describe('Integration:', function() {
    before(function(done) {
        helper.start(done);
    });

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