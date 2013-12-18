var fs = require('fs');

exports.readVersions = function() {
    return fs.readFileSync('./migrations/.versions.json');
};