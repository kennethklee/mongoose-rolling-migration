module.exports = exports = function(schema, options) {
    var opts = options || {},
        migrationVersionField = opts.migrationField || '__m';
        newField = {};

    newField[migrationVersionField] = String;
    schema.add(newField);
};
