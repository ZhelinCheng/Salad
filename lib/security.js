/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';
const fs = require("fs");
const os = require('os');
const shell = require('shelljs');

let _staticIp = [],
    _staticIpLen = 0;

let _cpu = [0, 0, 0];
let _memory = 1;

//允许
let _allowUa = 'Mozilla|Chrome|Safari|Edge|Firefox|Opera|Trident|MSIE|Gecko|okhttp';
//禁止
let _prohibitUa = 'XiaoDao';

class security {
    //主函数，调用所有安全检测
    main(obj) {

        //判断是否读取禁用IP
        this.readIp(obj.path.config);

        return this.isSize(obj.par.w, obj.par.h) ||
            this.isBrowser(obj.req.headers['user-agent']) ||
            this.loadavg() ||
            this.isStaticIp(obj.req);
    }


    //读取禁止IP
    readIp(path) {
        if (_staticIpLen > 0) {
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
    isSize(w, h) {
        if (w > 2000 || h > 2500) {
            return true
        } else {
            return false
        }
    }

    //检查浏览器
    isBrowser(ua) {
        if (!ua) {
            return true;
        }

        let allowRe = new RegExp(_allowUa, 'i'),
            prohibitRe = new RegExp(_prohibitUa, 'i');

        return !allowRe.test(ua) || prohibitRe.test(ua);
    }

    //检查黑名单IP
    isStaticIp(req) {
        let ip = req.headers['x-real-ip']
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

    //检查参数
    isParameter(query, par, url, source) {
        let state = false;
        let number = /[^0-9]/img;
        let order = parseInt(par['o']);
        let sourceLen = global.images[source] ? global.images[source].length : null;

        function urlArrangement() {
            url += '?';
            for (let j in par) {

                if (j === 's' && par['s']) {
                    //非法s参数
                    continue;
                } else if (j === 'o' && sourceLen && order >= sourceLen) {
                    //超出o参数
                    par[j] = order % sourceLen;
                    console.log(par[j]);
                    url += (j + '=' + par[j] + '&');
                    continue;
                }

                url += par[j] || j === 's' || par['o'] === 0 ? (j + '=' + par[j] + '&') : '';
            }

            let re = '&?s=true|.$|&?t='
                + par.w + 'x' + par.h;

            return url.replace(new RegExp(re, 'g'), '');
        }

        for (let i in query) {
            if (!(i in par) //是否为规定参数
                || (i === 's' && par[i]) //是否为非法s参数
                || (order >= sourceLen && sourceLen) //是超出o参数
                || (query[i] instanceof Array) //是否为重复参数
            ) {
                //参数冗余检查
                state = urlArrangement();
                break;
            }
        }

        if ((number.test(query.w) || number.test(query.h)) && !state) {
            //参数不规范，没冗余参数
            state = urlArrangement();
        }

        return state
    }

    //获取负载
    getLoadavg(time = 10000) {
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
    loadavg() {
        //CPU平均负载一分钟超过85%，五分钟超过80%
        //内存空闲少于10%

        if (_cpu[0] >= 85 || _cpu[1] >= 80) {
            return true
        } else if (_memory <= 0.1) {
            shell.exec('echo 3 > /proc/sys/vm/drop_caches', (code, stdout, stderr) => {
                if (code !== 0) {
                    console.log('非定时清除缓存执行错误\n' + stderr);
                }
            });
            return true
        } else {
            return false
        }
    }
}

let sec = new security();

//初始获取化服务器信息
sec.getLoadavg(8000);
module.exports = sec;