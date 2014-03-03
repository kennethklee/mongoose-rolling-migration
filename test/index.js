var async = require('async'),
    fs = require('fs'),
    exec = require('child_process').exec,
    helpers = require('./helpers');

describe('Rolling Migration', function() {
    before(function(done) {
        async.parallel([
            helpers.start,
            function(callback) {
                exec('./bin/migrate init', {cwd: process.cwd()}, function(data) {
                    // Hack: ./migrate assumes you've installed it, so copying the
                    //       template will fail. Let's copy it over.
                    fs.writeFileSync('./migrations/index.js', fs.readFileSync('./templates/index.js'));
                    callback();
                });
            }
        ], function() {
            done();
        });
    });

    after(function(done) {
        exec('./bin/migrate destroy -q', {cwd: process.cwd()}, function(data) {
            done();
        });
    });

    // Run tests
    require('./cli');
    require('./plugin');

});