var slug = require('slug');

console.log(process.argv);

var tableName = process.argv[3];

switch(process.argv[2]) {
    case 'create':
        var label = slug(process.argv.slice(4).join(' '));
        var version = require(process.cwd() + '/migrations')[tableName] || 0;

        // TODO create migration file;
        break;

    case 'up':
        break;

    case 'down':
        break;

    case 'reset':
        break;

}