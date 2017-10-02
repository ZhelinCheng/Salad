/**
 * Created by cheng on 2017/5/7.
 */

const md5 = require('md5');
const security = require("./security");
const error = require("./error");


module.exports = {
    start: function (obj) {
        obj.par = {};
        obj.par.w = parseInt(obj.req.query.w);
        obj.par.h = parseInt(obj.req.query.h);
        obj.par.o = parseInt(obj.req.query.o);
        obj.par.s = obj.req.query.s === 'false' ? !1 : !0;
        obj.par.t = obj.req.query.t
            ? obj.req.query.t : obj.par.w + 'x' + obj.par.h;


        //获取是否有冗余参数
        let parUrl = security.isParameter(obj.req.query,
            obj.par, obj.path.url + obj.req.route.path);

        if(parUrl){
            error(obj.res, 301, parUrl);
            return false;
        }

        console.log(security.main(obj));

        if(security.main(obj)){
            error(obj.res, 403);
            return false;
        }


    },
};