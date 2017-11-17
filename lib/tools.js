/**
 * Created by ChengZheLin on 2017/10/1.
 */

'use strict';

class tools {
    //生成随机数
    randomNum (Min, Max) {
        let Range = Max - Min,
            Rand = Math.random();
        return Min + Math.round(Rand * Range);
    }

    //随机路径选择
    randomPath (w,h) {
        let val = w * h + w * w + h * h + (w + h) * 13 * 14;
        val = val.toString();
        let len = val.length;

        if(parseInt(val.substring(len-1)) % 2) {
            val = '/coser'
        }else {
            val = '/pure'
        }

        return val;
    }
}

module.exports = new tools();