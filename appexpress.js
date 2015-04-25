/**
 * Created by ori22_000 on 4/16/2015.
 */

var config = require('./my_config');
var mys3wrapper =  require('./MyS3Wrapper');
var cache_manager = require  ('./cache_manager.js');
var ec2_lb_stat = require  ('./ec2_lb_stat.js');;

var fs = require('fs');
var multer  = require('multer');
var express = require('express');
var app = express();

// start the sever on port 80
var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port
    console.log('app listening at http://%s:%s', host, port)
})

//probably there is an easy or more elegant way to do it but it works....
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

//for easier load balancer debugging
app.get('/ping.html', function (req, res) {

    console.log('received ping');
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write("pong");
    res.end();

})

//calculate_grades and insert into cache
app.get('/calculate_grades', function (req, res) {
    mys3wrapper.list_all_files_and_calc_grades(function(average_dictionary){
        res.send(JSON.stringify(average_dictionary, null, 2));
    });
});

//Show results from cache button
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

//Clear cache button
app.get('/clear_cache',function(req,res){
    cache_manager.ClearCache(function(reply){
        console.log(reply.toString());

        console.log(JSON.stringify(reply, null, 2));
        res.end(JSON.stringify(reply,  undefined, 2));
    });
});

//Show AWS status button
app.get('/get_aws_state',function(req,res){
    ec2_lb_stat.GetRunningMachineAndLBData(function(reply){
        console.log(reply.toString());

        console.log(JSON.stringify(reply, null, 2));
        res.end(JSON.stringify(reply,  undefined, 2));
    });
});

app.post('/upload_file3',[ multer({
        dest: './uploads2/',
        inMemory: true,
        onFileUploadData: function (file, data, req, res) {
            mys3wrapper.upload_file(file, data, req, res, function(){
                console.log('done uploading files to s3');
            })
        },
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase()
        }
    }
), function(req, res){
    res.redirect('/index.html');

}]);