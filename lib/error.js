/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';

let _err= {
    403 : '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title>403 Frbidden<\/title><\/head>\n' +
    '<body bgcolor="white"><center><h1>403 Frbidden<\/h1><\/center><hr><center>Tuimeizi.cn<\/center><\/body><\/html>',

    500 : '<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><title>500 Internal Server Error<\/title><\/head>\n' +
    '<body bgcolor="white"><center><h1>500 Internal Server Error<\/h1><\/center><hr><center>Tuimeizi.cn<\/center><\/body><\/html>',
};

module.exports =  function (res,code, url) {
    switch (code) {
        case 301 :
            res.redirect(301, url);
            break;
        case 302 :
            res.redirect(302, url);
            break;
        case 403 :
            res.set('Content-Type', 'text/html');
            res.status(403).send(_err[403]);
            break;
        case 500:
            res.set('Content-Type', 'text/html');
            res.status(500).send(_err[500]);
            break;
    }
};