/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';
const fs = require("fs");
const os = require('os');

let _staticIp = [],
    _staticIpLen = 0;

let _cpu = [0,0,0];
let _memory = 1;

//允许
let _allowUa = 'Mozilla|Chrome|Safari|Edge|Firefox|Opera|Trident|MSIE|Gecko|okhttp';
//禁止
let _prohibitUa = 'XiaoDao';

class security {
    //主函数，调用所有安全检测
    main (obj) {

        //判断是否读取禁用IP
        this.readIp(obj.path.config);

        return this.isSize(obj.par.w, obj.par.h) ||
            this.isBrowser(obj.req.headers['user-agent']) ||
            this.loadavg() ||
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
        if(w > 2000 || h > 2500 || !w || !h) {
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

        let allowRe = new RegExp(_allowUa, 'i'),
            prohibitRe = new RegExp(_prohibitUa, 'i');

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

    //获取负载
    getLoadavg (time = 10000) {
        function getVal() {
            //在windows系统中os.loadavg()值一直为[0,0,0]
            _cpu = os.loadavg();
            _memory = os.freemem() / os.totalmem();
        }

        setInterval(function () {
            getVal();
        }, time);
    }

    //CPU负载及内存占用
    loadavg () {
        //CPU平均负载一分钟超过85%，五分钟超过80%
        //内存空闲少于10%

        if(_cpu[0] >= 85 || _cpu[1] >= 80){
            return true
        }else if(_memory <= 0.1){
            return true
        }else {
            return false
        }
    }
}

let sec = new security();
sec.getLoadavg(5000);


module.exports = sec;