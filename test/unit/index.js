var fs = require('fs'),
    exec = require('child_process').exec,
    assert = require('assert'),
    mongoose = require('mongoose'),
    cli = require('../../lib/cli');

describe('Unit:', function() {
    describe('Migrate CLI', function() {

        before(function(done) {
            // TODO symblink bin file
            // TODO initialize migrations
            
            done();
        });

        after(function(done) {
            // TODO destroy migrations
            // TODO unlink bin file
            done();
        });

        it.skip('should create a migration script', function(done) {
            cli.create('table', 'test cli create');

            // TODO Check for file ./migrations/table-0001-test-cli-create.js
            assert.ok(fs.existsSync('./migrations/table-0001-test-cli-create.js'));
        });

        it.skip('should migrate to latest', function(done) {
        });

        it.skip('should rollback', function(done) {
        });

        it.skip('should destroy all migrations', function(done) {
        });
    });
});
