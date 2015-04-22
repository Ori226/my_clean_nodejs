/**
 * Created by ori22_000 on 4/22/2015.
 */
console.log('your hello world');
var AWS = require('aws-sdk');



var s3bucket = new AWS.S3({ params: {Bucket: 'oribucket'} });





module.exports = {
    MyHelloWorld: function () {
        console.log('my hello world');

    },
    upload_string: function (stam_string, callback) {
        s3bucket.createBucket(function() {
            var params = {Key: 'myKey2', Body: stam_string};
            s3bucket.upload(params, function(err, data) {
                if (err) {
                    console.log("Error uploading data: ", err);
                } else {
                    console.log("Successfully uploaded data to myBucket/myKey");
                }

                callback();
            });
        });
    },
    list_all_files : function(cb){

        var allKeys = [];
        //function listAllKeys(cb)
        {
            s3bucket.listObjects({}, function(err, data){
                allKeys.push(data.Contents);

                if(data.IsTruncated)
                    listAllKeys(data.Contents.slice(-1)[0].Key, cb);
                else
                {
                    for(var i =0; i< data.Contents.length;++i)
                    {
                        //console.log(data.Contents[i].Key);
                        s3bucket.getObject(params = {Key:data.Contents[i].Key}, function(err, data) {
                            //var x = 0;
                            //concalculate_grade_from_object(file_deserialized_data)sole.log(data.Body.toString());
                            file_deserialized_data = JSON.parse(data.Body);



                            console.log(calculate_grade_from_object(file_deserialized_data));
                            //for(var entry_i = 0; entry_i<   file_deserialized_data["Grades"].length; ++entry_i)
                            //{
                            //    console.log(file_deserialized_data["Grades"][entry_i]);
                            //}
                            //console.log(JSON.parse(data.Body));
                        });
                    }
                }
                cb();
            });
        }
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

