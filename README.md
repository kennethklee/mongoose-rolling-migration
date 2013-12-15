mongoose-rolling-migration
==========================

Migrate your large mongo tables as you go. Whenever you query for data, you can migrate that data before you start processing it. This is ideal for apps that query single pages of data at a time.

Warning: If you process large amounts of data at once, the migration may take some time. In this case, you may want to use a background process to migrate all data.

install
-------

`npm install -save mongoose-rolling-migration`

usage
-----

```
db.User
    .find()
    .migrate()
    .exec(function(err, users) {
        // ...
    });
```
