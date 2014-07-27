#!/usr/bin/env node

var path = require('path'),
    fs = require('fs'),
    slug = require('slug'),
    common = require('./common'),
    tableName = process.argv[3],
    create,
    up,
    down,
    reset;

var stringify = function(json) {
    return JSON.stringify(json, null, 4);
};

var incrementVersion = function(tableName) {
    var versions = common.readVersions(),
        versionsFileName = process.cwd() + '/migrations/.versions.json';

    versions[tableName] = versions[tableName] ? versions[tableName] + 1 : 1;

    fs.writeFileSync(versionsFileName, stringify(versions));
};

exports.create = create = function(tableName, label) {
    var versions = common.readVersions(),
        templateFileName = path.join(__dirname, '..', 'templates', 'table-0000-label.js'),
        migrationLabel = slug(label),
        version = versions[tableName] || 0,
        nextVersion = version + 1,
        fileParts = [
            tableName.toLowerCase(),
            String('0000' + nextVersion).slice(-4),
            migrationLabel
        ],
        fileName = process.cwd() + '/migrations/' + fileParts.join('-') + '.js';

    // Copy template file to migration file
    fs.writeFileSync(fileName, fs.readFileSync(templateFileName));

    // Update migration versions
    incrementVersion(tableName);

    console.log();
    console.log('Created ./migrations/' + fileParts.join('-') + '.js');
    console.log();
};

exports.up = up = function(tableName) {

};

if (require.main === module) {
    switch(process.argv[2]) {
        case 'create':
            create(process.argv[3].toLowerCase(), process.argv.slice(4).join('-'));
            break;

        case 'up':
            up(process.argv[3].toLowerCase());
            break;

        case 'down':
            break;

        case 'reset':
            break;
    }
}

