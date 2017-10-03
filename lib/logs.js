/**
 * Created by ChengZheLin on 2017/10/3.
 */

'use strict';

const fs = require('fs');
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');


//日志目录
const logDirectory = './logs/';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


class logs {
    start (app){
        morgan.token('remote-addr', function(req, res){
            let ip =  req.headers['x-real-ip']
                ? req.headers['x-real-ip']
                : req.ip.replace(/::ffff:/, '');

            return ip || '-';
        });

        morgan.format('lulu', '[:date[iso]] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms');

        let accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDDHH',
            filename: logDirectory + 'access-%DATE%.log',
            frequency: '1h',
            max_logs : '10d',
            size : '5M',
            verbose: false
        });

        app.use(morgan('lulu', {stream: accessLogStream}));
    }
}

module.exports = new logs();