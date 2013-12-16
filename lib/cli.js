var slug = require('slug'),
    fs = require('fs'),
    tableName = process.argv[3];

console.debug(process.argv);

switch(process.argv[2]) {
    case 'create':
        var templateFileName = './templates/table-0000-label.js',
            label = slug(process.argv.slice(4).join(' ')),
            version = require(process.cwd() + '/migrations')[tableName] || 0,
            nextVersion = version++,
            fileParts = [
                tableName.toLowerCase(),
                String('0000' + nextVersion).slice(-4),
                label
            ],
            fileName = process.cwd() + '/migrations/' + fileParts.join('-') + '.js';

        console.log(fileName);

        // TODO copy template file to migration file

        // TODO update migrations index
        break;

    case 'up':
        break;

    case 'down':
        break;

    case 'reset':
        break;

}