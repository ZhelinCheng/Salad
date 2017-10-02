/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';
const fs = require("fs");

let _staticIp = [],
    _staticIpLen = 0;

class security {
    //主函数，调用所有安全检测
    main (obj) {

        //判断是否读取禁用IP
        this.readIp(obj.path.config);

        return this.isSize(obj.par.w, obj.par.h) ||
            this.isBrowser(obj.req.headers['user-agent']) ||
            this.isStaticIp(obj.req);
    }


    //读取禁止IP
    readIp (path) {
        if(_staticIpLen > 0) {
            return false;
        }

        fs.readFile(path + '/ip.txt', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            _staticIp = _staticIp.concat(data.split('\r\n'));
            _staticIpLen = _staticIp.length;
        });
    }


    //检查图片超出
    isSize (w,h) {
        if(w > 2000 || h > 2500) {
            return true
        }else {
            return false
        }
    }


    //检查浏览器
    isBrowser(ua) {
        if(!ua) {
            return true;
        }

        //允许
        let allowUa = 'Mozilla|Chrome|Safari|Edge|Firefox|Opera|Trident|MSIE|Gecko|okhttp';

        //禁止
        let prohibitUa = 'XiaoDao';

        let allowRe = new RegExp(allowUa, 'i'),
            prohibitRe = new RegExp(prohibitUa, 'i');

        return !allowRe.test(ua) || prohibitRe.test(ua);
    }

    //检查黑名单IP
    isStaticIp (req) {
        let ip =  req.headers['x-real-ip']
            ? req.headers['x-real-ip']
            : req.ip.replace(/::ffff:/, '');

        function contains(arr, ip) {
            let i = _staticIpLen;
            while (i--) {
                if (arr[i] === ip) {
                    return true;
                }
            }
            return false;
        }
        return contains(_staticIp, ip);
    }

    //检查参数冗余
    isParameter (query,par,url) {
        let  state = false;
        for (let i in query) {
            if(!(i in par)) {
                url += '?';
                state = (function () {
                    for (let j in par){
                        url +=  par[j] || j === 's' ? (j + '=' + par[j] + '&') : '';
                    }

                    let re = '&?s=true|.$|&?t='
                        + par.w + 'x' + par.h;

                    return url.replace(new RegExp(re,'g'), '');
                })();
                break;
            }
        }

        return state
    }
}


module.exports = new security();