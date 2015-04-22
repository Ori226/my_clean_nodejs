/**
 * Created by ori22_000 on 4/22/2015.
 */

var redis = require("redis"), client = redis.createClient(6379, '127.0.0.1', {})

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

//client.set("string key", "string val", redis.print);
//client.hset("hash key", "hashtest 1", "some value", redis.print);
//client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
//client.hkeys("hash key", function (err, replies) {
//    console.log(replies.length + " replies:");
//    replies.forEach(function (reply, i) {
//        console.log("    " + i + ": " + reply);
//    });
//    client.quit();
//});

//var res = client.get("mykey", redis.print);
//console.log( res );


client.get("mykey", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});



client.hgetall("user", function(err, reply) {
    // reply is null when the key is missing
    for(key in reply)
    {
        console.log(reply[key])



    }
    console.log(reply);
});

//
//module.exports = {
//    StoreInCache: function (key,value,cb) {
//
//        client.set(key,value, redis.print);
//        cb();
//
//    },
//    RetrieveFromCache: function () {
//        console.log('my hello world');
//
//    }
//}