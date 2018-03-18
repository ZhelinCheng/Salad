/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';
const express = require('express');
const response = require('./lib/response');
const arrangement = require('./lib/arrangement');
const os = require('os');
const fs = require('fs');
const upload = require('./lib/upload');
const app = express();
global.development = process.argv.indexOf('--dev') >= 0 ? true : null;

//读取配置文件
let setting = null;
try {
    setting = JSON.parse(fs.readFileSync("./setting.json", 'utf-8'));
} catch (err) {
    console.log('Error:' + '未找到配置文件\n' + err);
    return;
}

//保存源文件位置数据
global.images = {};

//日志监听
if (setting.logs.visit) {
    const logs = require('./lib/logs');
    logs.start(app, setting);
}

//初始化时间检测
arrangement.start({
    output: setting.path.output,
    logs: setting.logs.path + '/delete.log',
    os: os.type()
});

//let path = setting.path;//配置路径
setting.path.url = global.development ? 'http://localhost:3000' : setting.url;

app.use('/', express.static('public'));

app.get('/random', function (req, res) {
    response({req, res, setting})
});

app.get('/pure', function (req, res) {
    response({req, res, setting})
});

app.get('/coser', function (req, res) {
    response({req, res, setting})
});

app.get('/sexy', function (req, res) {
    response({req, res, setting})
});

app.get('/games', function (req, res) {
    response({req, res, setting})
});

app.get('/logo', function (req, res) {
    response({req, res, setting})
});


//图片上传相关
app.get('/api/upload', function (req, res) {
    res.redirect('/');
});

app.put('/api/upload', function (req, res) {
    res.redirect('/');
});

app.delete('/api/upload', function (req, res) {
    res.redirect('/');
});

app.use('/api/upload', function (req, res, next) {
    upload.start(req, res, next)
});

app.use('/output', express.static('res/output'));

app.listen(3000, function () {
    //开发状态打开浏览器
    console.log("占位图程序已启动，端口：3000 / 当前环境：" + (global.development ? "开发" : "生产"));
    /* if(global.development){
         const browser = require('child_process');
         //browser.exec('start ' + path.url + '/dev.html');
     }*/
});
