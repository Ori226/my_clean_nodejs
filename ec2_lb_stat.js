/**
 * Created by ori22_000 on 4/24/2015.
 */
var AWS = require('aws-sdk');
var config = require('./my_config');
var async = require('async');



AWS.config.update({region: config.default_region});
var ec2 = new AWS.EC2();
//{Name:'instance-state-name', Values:['running']}

//ec2.describeInstanceStatus(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(JSON.stringify( data,null,2));           // successful response
//});


//
//ec2.describeInstances(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(JSON.stringify( data,null,2));           // successful response
//});
//



var elb = new AWS.ELB();

module.exports = {
    GetRunningMachineAndLBData: function(callback){
        all_res = {};
        // an example using an object instead of an array
        async.series({
                one: function(callback){



                    var params = {
                        LoadBalancerName: config.LB_name /* required */
                    };
                    elb.describeLoadBalancerAttributes(params, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else
                        {
                            all_res.lb_status = data;
                            console.log(data);
                            callback(null, 1);
                        }           // successful response
                    });






                },
                two: function(callback){
                    var params = {
                        DryRun: false,

                        MaxResults: 10

                    };


                    ec2.describeInstanceStatus(params, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else
                        {
                            console.log(JSON.stringify( data,null,2));           // successful response
                            all_res.running_instances_statuse = data;
                            callback(null, 2);
                        }

                    });



                }
            },
            function(err, results) {

                callback(all_res);
                // results is now equal to: {one: 1, two: 2}
            });





    }

};










