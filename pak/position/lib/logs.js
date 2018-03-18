/**
 * Created by ChengZheLin on 2017/10/3.
 */

'use strict';

const fs = require('fs');
const morgan = require('morgan');
const FileStreamRotator = require('file-stream-rotator');
class Logs {
    start (app, setting){
        fs.existsSync(setting.logs.path) || fs.mkdirSync(setting.logs.path);

        morgan.token('remote-addr', function(req, res){
            let ip =  req.headers['x-real-ip']
                ? req.headers['x-real-ip']
                : req.ip.replace(/::ffff:/, '');

            return ip || '-';
        });

        morgan.format('lulu', '[:date[iso]] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms');

        let accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDDHH',
            filename: logDirectory + '%DATE%.log',
            frequency: '1h',
            max_logs : '7d',
            size : '5M',
            verbose: false
        });

        app.use(morgan('lulu', {stream: accessLogStream}));
    }
}

module.exports = new Logs();