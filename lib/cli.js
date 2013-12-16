var slug = require('slug'),
    fs = require('fs'),
    tableName = process.argv[3],
    create,
    up,
    down,
    reset;

exports.create = create = function(tableName, label) {
    var templateFileName = './templates/table-0000-label.js',
        migrationLabel = slug(label),
        version = require(process.cwd() + '/migrations')[tableName] || 0,
        nextVersion = version++,
        fileParts = [
            tableName.toLowerCase(),
            String('0000' + nextVersion).slice(-4),
            migrationLabel
        ],
        fileName = process.cwd() + '/migrations/' + fileParts.join('-') + '.js';

    console.log(fileName);

    // TODO copy template file to migration file

    // TODO update migrations index
};

console.log(process.argv);

if (require.main === module) {
    switch(process.argv[2]) {
        case 'create':
            create(process.argv[3], process.argv.slice(4).join('-'));
            break;

        case 'up':
            break;

        case 'down':
            break;

        case 'reset':
            break;
    }
}

