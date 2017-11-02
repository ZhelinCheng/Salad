/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';

const express = require('express');
const response = require('./lib/response');
const arrangement = require('./lib/arrangement');
const os = require('os');
const upload = require('./lib/upload');
//const logs = require('./lib/logs');

const app = express(),
    path = {
        url : 'https://tuimeizi.cn', //主URL
        output: './resources/output', //图片输出文件夹
        source: './resources/source', //图片源文件夹
        font: './resources/font',     //文字资源文件
        public: './public', //首页静态文件夹
        config: './config'  //配置相关文件
    };

//日志监听
//logs.start(app);

//初始化时间检测
arrangement.start({
    output : path.output,
    logs : './logs/delete.log',
    os : os.type()
});

app.use('/', express.static('public'));

app.get('/random', function (req, res) {
    response({
        path,
        req,
        res
    })
});

app.get('/pure', function (req, res) {
    response({
        path,
        req,
        res
    })
});

app.get('/coser', function (req, res) {
    response({
        path,
        req,
        res
    })
});

app.get('/sexy', function (req, res) {
    response({
        path,
        req,
        res
    })
});

app.get('/games', function (req, res) {
    response({
        path,
        req,
        res
    })
});

app.get('/logo', function (req, res) {
    response({
        path,
        req,
        res
    })
});


//图片上传相关
app.get('/api/upload', function( req, res ){
    res.redirect('/');
});

app.put('/api/upload', function( req, res ){
    res.redirect('/');
});

app.delete('/api/upload', function( req, res ){
    res.redirect('/');
});

app.use('/api/upload', function(req, res, next){
    upload.start(req, res, next)
});

app.use('/output', express.static('res/output'));

app.listen(3000);
