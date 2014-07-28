var async = require('async');

exports.readVersions = function() {
    return require(process.cwd() + '/migrations/.versions.json');
};

exports.migrate = function(docs, cb) {
    var simultaneous = 5;   // Simultaneous-ness

    async.eachLimit(docs, simultaneous, function(doc, next) {
        doc.migrate(next);
    }, cb);
};