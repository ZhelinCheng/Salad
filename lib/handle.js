/**
 * Created by cheng on 2017/5/5.
 * 图片处理模块
 */

'use strict';

const fs = require('fs');
const gm = require('gm');
const imageMagick = gm.subClass({imageMagick: true});
const path = require("path");
const error = require("./error");
const tools = require('./tools');

//图片数组
let _IMG_OBJ = {};

class handle {
    //读取该图片
    lookup(obj) {
        fs.readFile(obj.output + obj.name, (err, data) => {
            if (err) {
                console.log('err:' + '读取图片错误\n' + err);
                error(obj.res, 500);
                return;
            }
            obj.res.set('Content-Type', 'image/jpg');
            obj.res.send(data);
            obj = null;
        })
    }

    //查找是否有该图片
    exists(obj) {
        let data = null;
        try {
            data = fs.existsSync(obj.output + obj.name);
            if (data) {
                this.lookup(obj);
            } else {
                this.handle(obj);
            }
            data = null;
        } catch (err) {
            error(obj.res, 500);
            console.log('err:' + '查找图片错误\n' + err);
            obj = null;
        }
    }

    //剪切定位
    cropPos(obj, img) {
        //需求相关大小
        const objWidth = obj.par.w;
        const objHeight = obj.par.h;

        //实际图片大小
        const imgWidth = img.width;
        const imgHeight = img.height;

        //需求比例
        const objProportion = objWidth / objHeight;

        //图片比例
        const imgProportion = imgWidth / imgHeight;

        //定位点
        let x = 0;
        let y = 0;

        //裁剪宽高
        let w = imgWidth;
        let h = imgHeight;

        //需求为宽图
        if (objProportion >= imgProportion) {
            w = imgWidth;
            h = w / objProportion;
            y = (imgHeight - h) / 2;
        } else {
            h = imgHeight;
            w = h * objProportion;
            x = (imgWidth - w) / 2;
        }

        //文字处理方法
        let sizeBasics = 9.5 - (objWidth / 800 + objHeight / 800) / 2;

        if (objWidth > 1000) {
            sizeBasics = 12 - (objHeight / 1200);
        }else if(objWidth <= 150) {
            sizeBasics = 6;
        }else if(objWidth > 1500 && objWidth <= 200) {
            sizeBasics = 8;
        }

        let fontLen = obj.par.t.length;
        let textSize = objWidth / (sizeBasics + 10 / fontLen);

        //判断文字总长度是否大于
        if (textSize * fontLen >= objWidth) {
            textSize = objWidth / fontLen;
        }

        //判断文字是否大于高度
        if (textSize > h) {
            textSize = h;
        }

        if (objProportion >= 2.5) {
            textSize *= 0.56
        }

        return [w, h, x, y, parseInt(textSize)]
    }

    //生成图片
    generate(obj, imgs) {
        let that = this;
        let item = null;  //图片
        let imgObj = null;   //gm实例
        let crop = null;  //剪切参数

        if (obj.par.o || obj.par.o === 0) {
            item = imgs[obj.par.o % imgs.length];
        } else {
            let a = tools.randomNum(0, imgs.length - 1);
            item = imgs[a];
        }

        imgObj = imageMagick(obj.source + '/' + item);

        imgObj.size((err, img) => {
            if (err) {
                error(obj.res, 500);
                console.error('err:' + '读取图片大小失败\n' + err);
                return;
            }

            crop = that.cropPos(obj, img);

            //图片剪裁
            imgObj.crop(crop[0], crop[1], crop[2], crop[3])
                .resize(obj.par.w, obj.par.h)
                .quality(90)
                .noProfile();

            //判断是否需要写入文字
            if (obj.par.s === true && /[\u4E00-\u9FFF]/.test(obj.par.t)) {
                imgObj.fill('#ffffff')
                    .font(obj.path.font + '/wryh.ttf', crop[4])
                    //.stroke("#090909",1)
                    .drawText(0, 0, obj.par.t, 'Center');
            } else if (obj.par.s === true) {
                imgObj.fill('#ffffff')
                    .fontSize(crop[4])
                    .drawText(0, 0, obj.par.t, 'Center');
            }

            //判断是否有该路径
            that.mkdirsSync(obj.output);

            imgObj.write(obj.output + obj.name, (err) => {
                if (err) {
                    console.log('err：' + '图片写入错误\n' + err + '\n' + obj.par);
                    error(obj.res, 500);
                    return;
                }
            });

            imgObj.toBuffer('jpg', (err, buffer) => {
                if (err) {
                    error(obj.res, 500);
                    console.log('err：' + '图片转换错误\n' + err + '\n' + obj.par);
                    return;
                }
                obj.res.set('Content-Type', 'image/jpg');
                obj.res.send(buffer);

                imgObj = null;
                obj = null;
                item = null;
                crop = null;
            });
        });
    }

    //处理图片
    handle(obj) {
        let that = this;
        let source = obj.path.source;

        if (obj.par.w >= obj.par.h || obj.route === '/logo') {
            source += '/w' + obj.route;
        } else if (obj.par.w < obj.par.h) {
            source += '/h' + obj.route;
        }

        obj.source = source;
        if (_IMG_OBJ[source]) {
            that.generate(obj, _IMG_OBJ[source]);
            source = null;
        } else {
            fs.readdir(source, (err, arr) => {
                if (err) {
                    error(obj.res, 500);
                    console.error('err:' + '读取' + source + '源文件错误\n' + err);
                    return;
                }
                _IMG_OBJ[source] = arr;
                that.generate(obj, _IMG_OBJ[source]);
                source = null;
            });
        }
    }

    //文件路径
    mkdirsSync(dirname) {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (this.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }
}

module.exports = new handle();
