mongoose-rolling-migration
==========================

The benefit of Mongo, is that you can update you data when you get to it. However, I could not find an "as you go" data migration library for Mongo; so I created one.

This plugin allows you to migrate your large mongo tables as you go. Whenever you query for data, you can migrate that data before you start to render it. This is ideal for web apps that display paginated data.

Warning: If you process large amounts of data at once, the migration may take some time. In this case, you may want to use a background process to migrate all data.



install
-------

1.  Install the plugin to your node app.

    `npm install -save mongoose-rolling-migration`

2.  Install the migrate plugin on your schemas.

    ```
    var migratePlugin = require('mongose-rolling-migration');

    var UserSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    UserSchema.plugins(migratePlugin);
    ```

    This plugin adds a new field, `__m`, to your schema to track the record's migration version.

3.  Initialize migration tracking in your code. In a CLI:

    `migrate init`

    This will create a `./migrations` directory and initialize it with a index.js file which holds the latest versions of migration. The plugin will use this to check for which records needs to be updated.


usage
-----

### Create a Migration

First, you need a migration script to update your models. To create one, use the `migrate create` command.

`migrate create <table name> <title>`

Example:
`migrate create users "Add description"`

This will create migration script in `./migrations` with the filename `<table name>-<version>-<title>`. For example, your first migration on the users table will be `users-001-add-description.js`.



### Edit Migration File
Open up your migration file. It should have a default `up` and `down` function.

Example:
```
exports.up = function(data, done) {
    data.description = "This is the default description.";
    done();
};

exports.down = function(data, done) {
    data.description = undefined;
    done();
};
```

### Perform Migration

You can migrate all your data at once or as you go. Since this plugin is for updating as you go, we'll start with that.

Any form of migration will output to the logs.

#### Migrating as you go

This is for migrating as you get to specific documents. For example, your user listing page or show user details page is perfect for this.

Example:

```
db.User
    .findById(id)
    .migrate()
    .exec(function(err, user) {
        res.render('users/show', {user: user});
    });
```

You can migrate after processing your data as well. This is safe only if your render works with all versions of data.

```
db.User
    .findById(id)
    .exec(function(err, user) {
        res.render('users/show', {user: user});

        process.nextTick(function() {
            db.User.migrate(user);
        });
    });
```

#### Migrating All at Once

This is for getting the latest data while developing or doing a background batch process. You can do this by command line with the following:

`migrate up <table name>`

Example:
`migrate up users`

Migration will pull up the Users table and update each record to the latest version.

Alternatively, you can migrate via node; this is similar to migrating as you go.

```
db.User
    .find()
    .migrate()
    .exec(function(err, users) {
        console.log('Migration is complete.');
    });
```

final notes
-----------

The `.migrate()` method does not migrate when the result set is lean. This means it does not work with `.lean` nor `.populate()` nor any other methods that makes the result set lean.

Hope you find this useful.
