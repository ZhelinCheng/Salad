/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';

const express = require('express');
const response = require('./lib/response');


/*const upload = require('jquery-file-upload-middleware');*/
const app = express(),
    path = {
        url : 'https://tuimeizi.cn', //主URL
        output: './res/output', //图片输出文件夹
        source: './res/source', //图片源文件夹
        public: './public', //首页静态文件夹
        config: './config'  //配置相关文件
    };

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
/*upload.configure({
    uploadDir: __dirname + '/public/uploads/',
    uploadUrl: '/uploads'
});

/// Redirect all to home except post
app.get('/api/upload', function( req, res ){
    response.redirect('/');
});

app.put('/api/upload', function( req, res ){
    response.redirect('/');
});

app.delete('/api/upload', function( req, res ){
    response.redirect('/');
});*/

app.use('/output', express.static('res/output'));

app.listen(3000);
