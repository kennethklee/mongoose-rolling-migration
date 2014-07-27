var mongoose = require('mongoose'),
    async = require('async'),
    common = require('./common'),
    Query = mongoose.Query,
    Model = mongoose.Model,
    Promise = mongoose.Promise,
    Plugin;

/**
 * ## Migration plugin
 * Adds a new field, `__m` to the schema which contains the version of the document.
 * Also adds a method to the model, `Model.migrate(docs, cb)`, and a method to each
 * document, `doc.migrate(cb)`.
 */
exports = Plugin = function(migrations) {
    Plugin.migrations = migrations;

    return function(schema, options) {
        var versions = require(process.cwd() + '/migrations/.versions.json');
        var opts = options || {},
            migrationVersionField = '__m',  // Hardcoding for now
            simultaneous = 5,   // Simultaneous-ness
            newField = {};

        newField[migrationVersionField] = {type: Number, default: 0};
        schema.add(newField);

        // Model.migrate()
        schema.static('migrate', function(docs, done) {
            async.eachLimit(docs, simultaneous, function(doc, next) {
                doc.migrate(next);
            }, done);
        });

        // doc.migrate()
        schema.method('migrate', function(cb) {
            var modelName = this.constructor.modelName,
                versions = migrations.listByVersion(modelName),
                latestVersion = common.readVersions()[modelName],
                data = this.toObject();

            var currentVersion = data.__m;

            while(currentVersion <= latestVersion) {
                var migrate = versions[currentVersion];
                if (migrate) {
                    data = migrate(data);
                }

                currentVersion++;
            }

            this.set(data);
            this.save(cb);
        });
    };
};


/**
 * Add a migrate query option
 */
Query.prototype.migrate = function() {
    var versions = require(process.cwd() + '/migrations/.versions.json');
    var opts = this._mongooseOptions;

    console.log(opts);

    // TODO return if schema does not have a __m field.
    // TODO add query post processing

    this.addBack(function(err, args) {
        // TODO return if dataset is lean

    });

    return this;
};
