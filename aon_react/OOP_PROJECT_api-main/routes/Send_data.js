var express = require('express');
var router = express();
const fs  = require('fs');
var multer = require('multer');
var http = require('http');
const direct = 'D:/Downloads/landmark-recognition-2020';
const s_n = 'landmark-recognition-2020';
const csv = require("csv-parser");

set_data = (path,Sub_N)=>
{
    let files = fs.readdirSync(path);
    let arr = [];
    for(let file of files)
    {
        if(file.indexOf('.')==-1)
        {
            var temp = {
                title: (file.toString()),
                subtitle: (Sub_N+"/"+file.toString()),
                children : set_data(path+"/"+file,Sub_N+"/"+file)
            }
            arr.push(temp);
        }
        else
        {
            var temp = {
                title: (file.toString()),
                subtitle: (Sub_N+"/"+file.toString()),
            }
            arr.push(temp);
        }
    }
    return arr;
}
set_path =(path)=>
{
    let files = fs.readdirSync(path);
    //console.log(path);
    let test = JSON.stringify(files);
    let test2 = JSON.parse(test);
    router.get("/"+path,function(req,res,next){
        res.send(test2);
        console.log(test2);
    });
    for(const file of files)
    {
        if(file.indexOf('.')==-1)
        {
            set_path(path+'/'+file);
        }
        else
        {
            /*let temp_url = path+'/'+file;
            var data = fs.readFileSync(temp_url);
            var tempdata = new Buffer.from(data).toString('base64');
            router.get("/"+path+"/"+file,function(req,res,next){
                res.send(JSon.parse (tempdata));
            });*/
            //console.log("send image pass");
        }
    }
}
get_post = ()=>
{
    router.get("/image",function(req,res,next){
        let temp_path = req.url.split("=")[1].replace(/%2F/g,"/");
        console.log(temp_path);
        if(temp_path.indexOf(".")!=-1)
        {
            let data = fs.readFileSync(temp_path);
            let tempdata = new Buffer.from(data).toString('base64');
            console.log(temp_path.indexOf('.'));
            res.send(tempdata);
        }
        else
        {
            res.send("Not File!!!");
        }
    });   
}
set_candle = ()=>
{
    var c_temp = [];
    var c_result = [];
    const data = fs.createReadStream("D:/Downloads/landmark-recognition-2020/XAGUSD60.csv").pipe(csv()).on('data', (data) => c_temp.push(data))
    .on('end', () => {
        for(let d_data of c_temp)
        {
            
            let hr = d_data.hr.split(":");
            let date = d_data.date.split('.');
            let temp_data = {x:{hr: hr,date :date},y:[parseFloat(d_data.open),parseFloat(d_data.high),parseFloat(d_data.low),parseFloat(d_data.close)]}
            //console.log(temp_data);
            c_result.push(temp_data);
        }
        router.get("/candle_data",function(req,res,next)
        {
            res.send(c_result);
        })
    });
}
set_path(direct);

//console.log(direct);
get_post();
set_candle();
var data =
[{
    title: "landmark-recognition-2020",
    subtitle: "landmark-recognition-2020",
    children: set_data(direct,s_n)
}]
let data1 = JSON.stringify(data);
let data2 = JSON.parse(data1);
router.get("/",function(req,res,next)
{
    res.send(data2);
})
console.log("set up data PASS");
module.exports = router;