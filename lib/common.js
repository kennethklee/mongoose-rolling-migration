exports.readVersions = function() {
    return require(process.cwd() + '/migrations/.versions.json');
};