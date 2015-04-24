/**
 * Created by ori22_000 on 4/24/2015.
 */


var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ec2 = new AWS.EC2();

var params = {
    DryRun: false,
    Filters:[{Name:'instance-state-name', Values:['running']}],
    MaxResults: 10

};
//ec2.describeInstanceStatus(params, function(err, data) {
//    if (err) console.log(err, err.stack); // an error occurred
//    else     console.log(JSON.stringify( data,null,2));           // successful response
//});



ec2.describeInstances(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(JSON.stringify( data,null,2));           // successful response
});

