/**
 * Created by cheng on 2017/5/5.
 * 图片处理模块
 */

'use strict';

const fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({imageMagick: true});
const error = require("./error");
const tools = require('./tools');

//图片数组
let _IMG_OBJ = {};

class handle {
    //读取该图片
    lookup (obj) {
        fs.readFile(obj.output, function (err, data) {
            if (err) {
                console.log('err:' + '读取图片错误\n' + err);
                error(obj.res,500);
                return;
            }

            obj.res.set('Content-Type', 'image/jpg');
            obj.res.send(data);
        })
    }

    //查找是否有该图片
    exists (obj) {
        let data = null;

        try {
            data = fs.existsSync(obj.output);

            if (data) {
                this.lookup(obj);
            } else {
                data = this.handle(obj);
            }
            return data;
        } catch (err) {
            error(obj.res,500);
            console.log('err:' + '查找图片错误\n' + err);
        }
    }

    //剪切定位
    cropPos (obj, img) {
        let objP = obj.par.w > obj.par.h,
            imgP = img.width > img.height;

        let _w = img.width,
            _h = img.height,
            _l = 0, _r = 0, _size = 12;

        if (objP && imgP) {
            _h = img.height;
            _w = obj.width * (_h / obj.height);

            if (_w > img.width) {
                _w = img.width;
                _h = obj.height * (_w / obj.width);
                _r = (img.height - _h) / 2;
            } else {
                _l = (img.width - _w) / 2;
            }
        } else if (!objP && imgP) {
            _h = img.height;
            _w = obj.width * (_h / obj.height);
            _l = (img.width - _w) / 2;
        } else if (!objP && !imgP) {
            _w = img.width;
            _h = obj.height * (_w / obj.width);
            if (_h > img.height) {
                _h = img.height;
                _w = obj.width * (_h / obj.height);
                _l = (img.width - _w) / 2;
            } else {
                _r = (img.height - _h) / 2;
            }
        } else if (objP && !imgP) {
            _w = img.width;
            _h = obj.height * (_w / obj.width);
            _r = (img.height - _h) / 2;
        }

        const ca = obj.text.length;
        _size = objP ? obj.height : obj.width;

        if (obj.show) {
            _size = _size / 9.25;
            if (_size * ca >= obj.width) {
                _size = obj.width / ca * 2;
            }
        } else {
            _size = _size / (ca + 1);
        }

        return [_w, _h, _l, _r, parseInt(_size)]
    }


    //生成图片
    generate (obj, imgs, pos) {
        let that = this;
        let item = null;  //图片
        let imgObj = null;   //gm实例
        let crop = null;  //剪切参数

        if (obj.par.o || obj.par.o === 0) {
            item = imgs.arr[obj.par.o % imgs.len];
        } else {
            item = imgs.arr[tools.randomNum(0, imgs.len - 1)];
        }

        imgObj = imageMagick(obj.source + item);

        imgObj.size(function (err, img) {
            if (err) {
                error(obj.res, 500);
                console.error('err:' + '读取图片大小失败\n' + err);
                return;
            }

            crop = that.cropPos(obj, img);

            //图片剪裁
            imgObj.crop(crop[0], crop[1], crop[2], crop[3])
                .resize(obj.par.w, obj.par.h)
                .quality(90);

            //判断是否需要写入文字
            if (obj.par.s === true) {
                imgObj.fill('#ffffff')
                //.stroke("#090909",1)
                    .fontSize(_ele[4])
                    .drawText(0, 0, obj.par.t, 'Center');
            }


            imgObj.noProfile()
                .write(obj.output, function (err) {
                    if (err) {
                        error(obj.res, 500);
                        console.log('err：' + '图片处理错误\n' + err);
                        return;
                    }

                    //that.lookup(obj, res);
                });
        });
    }

    //处理图片
    handle (obj) {
        let that = this;
        let source = obj.path.source;

        if(obj.par.w >= obj.par.h || obj.route === '/logo') {
            source += '/w' + obj.route;
        }else if(obj.par.w < obj.par.h){
            source += '/h' + obj.route;
        }

        obj.source = source;

        if(_IMG_OBJ[source]) {
            that.generate(obj, _IMG_OBJ[source])
        }else {
            fs.readdir(source, function (err, arr) {
                if (err) {
                    error(obj.res,500);
                    console.error('err:' + '读取'+ source +'源文件错误\n' + err);
                    return;
                }
                _IMG_OBJ[source] = {};
                _IMG_OBJ[source]['imgs'] = arr;
                _IMG_OBJ[source]['len'] = arr.length;

                that.generate(obj, _IMG_OBJ[source])
            });
        }


        /*let _img = null,
            _ele = null,
            that = this,
            _pos = null,
            _name = null,
            _item = null;

        if (obj.width >= obj.height || obj.ele === "l") {
            _pos = 'w/'
        } else if (obj.width < obj.height) {
            _pos = 'h/'
        }

        _pos = _pos + obj.ele + '/';

        //图片处理
        function imageCut(arr) {
            if (obj.order !== false) {
                _item = arr[obj.order % arr.length];
            } else {
                _item = arr[that.randomNum(0, arr.length - 1)];
            }

            _img = imageMagick(that.path.source + _pos + _item);

            _img.size(function (err, img) {
                if (err) {
                    res.status(500).send(error[500]);
                    console.error('err2:' + err);
                    return;
                }

                _ele = that.cropPos(obj, img);
                _img.crop(_ele[0], _ele[1], _ele[2], _ele[3])
                    .resize(obj.width, obj.height)
                    .quality(90);

                if (obj.hide === true || obj.hide !== 'false') {
                    _img.fill('#ffffff')
                    //.stroke("#090909",1)
                        .fontSize(_ele[4])
                        .drawText(0, 0, obj.text, 'Center');
                }
                _img.noProfile()
                    .write(that.path.output + obj.ele + '/' + obj.name, function (err) {
                        if (err) {
                            res.status(500).send(error[500]);
                            console.error('err3:' + err);
                            return;
                        }

                        that.lookup(obj, res);
                    });
            });
        }

        if(_IMG_OBJ[_pos] instanceof Array){
            imageCut(_IMG_OBJ[_pos]);
        }else {
            fs.readdir(this.path.source + _pos, function (err, arr) {
                if (err) {
                    res.status(500).send(error[500]);
                    console.error('err1:' + err);
                    return;
                }
                _IMG_OBJ[_pos] = arr;
                imageCut(arr)
            });
        }*/
    }
}

module.exports = new handle();
