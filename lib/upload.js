/**
 * Created by ChengZheLin on 2017/10/3.
 */

'use strict';

const up = require('jquery-file-upload-middleware');
const security = require("./security");
const error = require("./error");

up.configure({
    uploadDir: './public/uploads/',
    uploadUrl: '/uploads'
});

class Upload {
    start (req, res, next){
        if(security.isBrowser(req.headers['user-agent'])
            || security.isStaticIp(req)){
            error(res, 403);
            return;
        }

        up.fileHandler({
            uploadDir: function () {
                return './public/uploads/'
            },
            uploadUrl: function () {
                return '/uploads'
            }
        })(req, res, next);
    }
}

module.exports = new Upload();