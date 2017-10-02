/**
 * Created by cheng on 2017/5/5.
 * 图片处理模块
 */
const fs = require('fs'),
    path = require('path'),
    gm = require('gm'),
    imageMagick = gm.subClass({imageMagick: true});
const error = require("./error");

//图片数组
let _IMG_OBJ = {};

module.exports = {
    path: {
        output: './res/output/',
        source: './res/source/'
    },

    //读取该图片
    lookup: function (obj, res) {
        //res.redirect(302, obj.host + '/' + obj.name);

        fs.readFile(this.path.output + obj.ele + '/' + obj.name, function (err, data) {
            if (err) {
                res.status(500).send(error[500]);
                console.log('err4:' + err);
                return;
            }

            res.set('Content-Type', 'image/jpg');
            res.send(data);
        })
    },

    //查找是否有该图片
    exists: function (obj, res) {
        let data = null;
        try {
            data = fs.existsSync(this.path.output + obj.ele + '/' + obj.name);

            if (data) {
                this.lookup(obj, res);
            } else {
                data = this.handle(obj, res);
            }
            return data;
        } catch (err) {
            console.error('err5:' + err);
        }
    },

    //剪切定位
    cropPos: function (obj, img) {
        let objP = obj.width > obj.height,
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
    },

    //生成随机数
    randomNum: function (Min, Max) {
        let Range = Max - Min,
            Rand = Math.random();
        return Min + Math.round(Rand * Range);
    },

    //处理图片
    handle: function (obj, res) {
        let _img = null,
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
        }
    }
};
