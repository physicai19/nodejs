const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const session = require('cookie-session')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.json(__dirname,'public')))
app.use(express.static(path.json(__dirname,'upload')))

app.use(session({
    name:'express cookie session',
    keys:['secret'],
    maxAge:24 * 60 * 60 * 1000 //24小时
}))

app.set('views',path.json(__dirname,'views'));
app.set('view engine','pug');

let uplodaPath = './upload'
const multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uplodaPath)
    },
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split(".");
        cb(null,file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
let upload = multer({storage: storage})

const zfRouter = require('./routes/zf1')

app.use('/zf1',zfRouter)

const serverport = 8080
app.listen(serverport,()=>console.log(`Express is running on port:${serverport}`))