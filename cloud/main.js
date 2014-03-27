var Parse = require('cloud/lib/parse');

Parse.Cloud.define('test', function(req, res) {

    var Post = Parse.Object.extend('Post');

    var query = new Parse.Query(Post);
    query.descending('createdAt');
    query.find().then(function(results) {

        console.log(results);
        res.success(results);
    }, function(error) {

        res.jsonp(error);
    });
});

require('cloud/app.js');
