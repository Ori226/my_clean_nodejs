/**
 * Created by ori22_000 on 4/22/2015.
 */

var redis = require("redis"), client = redis.createClient(6379, '127.0.0.1', {})

client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = {
    StoreInCache: function (key,value,cb) {
        client.hmset('average_grades',key,value, redis.print);
        cb();
    },
    RetrieveFromCache: function (cb) {
        client.hgetall("average_grades", function(err, reply) {
            cb(reply);
        });
    },
    ClearCache: function (cb) {
        client.del("average_grades", function(err, reply) {
            cb(reply);
        });
    }
}