/**
 * Created by ori22_000 on 4/24/2015.
 */

var my_config = require('./my_config');
var async = require('async');

var AWS = require('aws-sdk');
AWS.config.update({region: my_config.default_region});

var ec2 = new AWS.EC2();
var elb = new AWS.ELB();

module.exports = {
    GetRunningMachineAndLBData: function(callback){
        all_res = {};


        var load_balancer_details = {};

        async.series({
                get_load_balancer_info: function(callback){

                    var params = {
                    };
                    elb.describeLoadBalancers(params, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else
                        {
                            load_balancer_details.name = data.LoadBalancerDescriptions[0].LoadBalancerName;
                            load_balancer_details.DNSName = data.LoadBalancerDescriptions[0].DNSName
                            all_res.load_balancer_status = load_balancer_details;
                            callback(null, 1);
                        }           // successful response
                    });
                },
                get_load_balancer_state: function(callback){


                    var params = {
                        LoadBalancerName: config.LB_name /* required */
                    };

                    elb.describeInstanceHealth(params, function(err, data) {
                        if (err)
                            console.log(err, err.stack); // an error occurred
                        else
                        {
                            load_balancer_details.instances_state = data.InstanceStates;
                        }
                    });
                    callback(null, 2);
                },
                get_instances_state:  function(callback){
                    var params = {
                        DryRun: false,
                        MaxResults: 100
                    };

                    ec2.describeInstances(params, function(err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else
                        {
                            all_instances_results = [];
                            for(instance_i in data.Reservations)
                            {
                                all_instances = data.Reservations[instance_i].Instances[0];
                                instance_details = {};
                                var tags =  all_instances.Tags;
                                var instance_name = "";
                                for(tag_i in tags)
                                {
                                    if(tags[tag_i].Key == "Name")
                                    {
                                        instance_name = tags[tag_i].Value;
                                        break;
                                    }
                                }
                                instance_details.name =instance_name;
                                instance_details.instance_type =  all_instances.InstanceType;
                                instance_details.availability_zone = all_instances.Placement.AvailabilityZone;
                                instance_details.public_dns = all_instances.PublicDnsName;
                                all_instances_results.push(instance_details);
                            }

                            all_res.running_instances = all_instances_results;
                            callback(null, 3);
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










