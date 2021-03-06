/**
 * Created by ori22_000 on 4/22/2015.
 */
console.log('your hello world');
var AWS = require('aws-sdk');

async = require('async');
var cache_manager = require('./cache_manager.js');

var config = require('./my_config');
var s3bucket = new AWS.S3({ params: {Bucket: config.bucket_name} });

module.exports = {
    upload_file: function (file, data, req, res, callback) {
        s3bucket.createBucket({Bucket: config.bucket_name}, function() {
            var params = {
                //Bucket: 'oribucket',
                Key: file.name,
                Body: data
            };

            s3bucket.putObject(params, function (perr, pres) {
                if (perr) {
                    console.log("Error uploading data: ", perr);
                } else {
                    console.log("Successfully uploaded data to myBucket/myKey");
                    callback();
                }
            });
        });
    },
    list_all_files_and_calc_grades : function(cb){
        var allKeys = [];
        s3bucket.listObjects({}, function(err, data){
            allKeys.push(data.Contents);

            if(data.IsTruncated)
                listAllKeys(data.Contents.slice(-1)[0].Key, cb);
            else
            {
                var asyncTasks = [];
                async.each(data.Contents, function(item, callback)
                {
                    console.log(item);
                    var item_key = item.Key;
                    s3bucket.getObject(params = {Key:item_key}, function(err, data) {
                        file_deserialized_data = JSON.parse(data.Body);
                        var average = calculate_grade_from_object(file_deserialized_data);
                        cache_manager.StoreInCache(item_key,average, function(){ callback();});
                    });
                },
                function(err){
                    cache_manager.RetrieveFromCache(cb);
                });
            }
        });
    }
};

function calculate_grade_from_object(deser_object)
{
    var grades_average = 0;
    var number_of_elements = deser_object["Grades"].length;
    for (key in deser_object["Grades"])
    {
        for(key_j in deser_object["Grades"][key])
        {
            grades_average = grades_average + deser_object["Grades"][key][key_j]/number_of_elements;
        }
    }
    return grades_average;
}

