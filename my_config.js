/**
 * Created by ori22_000 on 4/24/2015.
 */


var config = {}

config.default_region = 'us-east-1';
config.LB_name = 'MyLb3';


config.redis = {};
//config.redis.uri = '172.31.56.243';
config.redis.uri = '127.0.0.1';
config.redis.host = 'hostname';
config.redis.port = 6379;
config.bucket_name = 'my_bucket_for_ha1';


module.exports = config;
