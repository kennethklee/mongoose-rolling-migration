var fs = require('fs'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    cli = require('../../lib/cli');

describe('CLI', function() {
    it('should create a migration script', function(done) {
        cli.create('table', 'test cli create');

        assert.ok(fs.existsSync('./migrations/table-0001-test-cli-create.js'));

        done();
    });

    it.skip('should migrate to latest', function(done) {
        //cli.up('')
    });

    it.skip('should rollback', function(done) {
    });

    it.skip('should reset back data back', function(done) {
    });
});