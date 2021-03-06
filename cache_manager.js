/**
 * Created by ori22_000 on 4/22/2015.
 */

var config = require('./my_config')

var redis = require("redis"), client = redis.createClient(config.redis.port, config.redis.uri, {})

client.on("error", function (err) {
    console.log("Error " + err);
});

// check the redis connection is ok
client.on("ready", function () {
    console.log("redis is ready ");
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