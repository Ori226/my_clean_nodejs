/**
 * Created by ori22_000 on 4/16/2015.
 */


mys3wrapper =  require('./MyS3Wrapper');

//mys3wrapper.list_all_files(function () {
//    console.log('done');
//});


var fs = require('fs');

var cache_manager = require  ('./cache_manager.js');


var multer  = require('multer');
var express = require('express');
var AWS = require('aws-sdk');

var async = require('async');


var app = express()
var http = require('http'), fs = require('fs');





var s3 = new AWS.S3();






var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})








app.get('/index.html', function (req, res) {

    fs.readFile('index.html', function (err, html) {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
    });

})








app.get('/calculate_grades', function (req, res) {

    mys3wrapper.list_all_files(function(average_dictionary){

        console.log('-------------');
        console.log(JSON.stringify(average_dictionary, null, 2));
        console.log('-------------');
        res.send(JSON.stringify(average_dictionary, null, 2));

    });




});




app.get('/get_res_from_cache',function(req,res){

    cache_manager.RetrieveFromCache(function(reply){
        if(reply == null)
        {
            res.end('empty');
        }
        else
        {
            res.end(JSON.stringify(reply,  undefined, 2));
        }
    });


});



app.get('/clear_cache',function(req,res){

    cache_manager.ClearCache(function(reply){
        console.log(reply.toString());

        console.log(JSON.stringify(reply, null, 2));
        res.end(JSON.stringify(reply,  undefined, 2));
    });


});





//----------
var params = {
    DryRun: true,
    MaxResults: 0
};


//-------



var s32 = new AWS.S3();

app.post('/upload_file3',[ multer({
        dest: './uploads2/',
        inMemory: true,
        onFileUploadData: function (file, data, req, res) {
            // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
            var params = {
                Bucket: 'oribucket',
                Key: file.name,
                Body: data
            };

            s32.putObject(params, function (perr, pres) {
                if (perr) {
                    console.log("Error uploading data: ", perr);
                } else {
                    console.log("Successfully uploaded data to myBucket/myKey");
                }
            });
        },
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase()
        }
    }
), function(req, res){
    console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end()
}]);