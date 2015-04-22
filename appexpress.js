/**
 * Created by ori22_000 on 4/16/2015.
 */


mys3wrapper =  require('./MyS3Wrapper');
mys3wrapper.list_all_files(function () {
    console.log('done');
});
var fs = require('fs');




var multer  = require('multer');
var express = require('express');
var AWS = require('aws-sdk');




var app = express()
var http = require('http'), fs = require('fs');





var s3 = new AWS.S3();





app.get('/', function (req, res) {
    res.send('Hello World!')
})


app.get('/test_cmd1', function (req, res) {
    res.send('Hello World2!')
})





var server = app.listen(3000, function () {

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








app.get('/stam_query', function (req, res) {

    res.send('Hello World3!')

});



app.post('/upload_file2',function(req,res){
    if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
    }
});

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