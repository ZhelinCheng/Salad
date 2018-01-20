# Node-Position
一个十分养眼的占位图Node.js程序。

## 说明

默认关闭了日志功能，因为有内存溢出的情况，如需开启，增加--log参数即可。
下一步准备使用Redis存储图片源图片数据。

    使用：http://127.0.0.1:3000/random?w={width}&h={height}&t={text}&o={number}&s={false||0}

## 文档

### 使用

使用前请安装 [GraphicsMagick](http://www.graphicsmagick.org/) 或 [ImageMagick](http://www.imagemagick.org/).

安装：

    yarn install

启动（开发）：

    nodemon app.js --dev

启动（生产）:

    node app.js

### 分类

#### /random 
随机图片，将从/pure及/coser中选取图片（伪随机，通过传递的宽高选择）

#### /pure
清纯图片

#### /sexy
性感图片

#### /coser
coser图片

#### /games
游戏图片，特殊需求

#### /logo
游戏LOGO，特殊需求

### 参数
* `w` 参数（必须）：需要的图片宽度，不需要带单位
* `h` 参数（必须）：需要的图片高度，不需要带单位
* `t` 参数（可选）：需要设置的文字，支持中英文
* `s` 参数（可选）：是否显示图片上的文字，默认显示。可设置参数`false`或`0`
* `o` 参数（可选）：图片顺序

## 目录说明
* /resources/ 资源文件夹
* /public/ 放置首页等静态文件
* /lib/ 放置核心逻辑
* /config/ 黑名单等配置文件
* /logs/ 日志目录

## 文件说明
* /app.js 程序入口及路由文件
* /lib/arrangement.js 历史文件删除
* /lib/error.js 错误处理
* /lib/handle.js 图片处理
* /lib/security.js 基础防御逻辑
* /lib/tools.js 工具类
* /lib/logs.js 日志生成逻辑

## 更新日志

### v2.2.7
- 增加一个参数安全判断
- 其他优化

### v2.2.4
- 修复一个图片生成出现的意外BUG
- 其他优化
- 增加定时Linux buff/Cache清除

### v2.2.2
- 增加中文字体

### v2.1.2
- 优化负载获取

### v2.1.1
- 增加日志功能
- 修复宽高未定义的BUG
- 增加CPU内存负载判断

### v2.0.1
- 修改上传文件的BUG

### v2.0.0

- 重构完成，增加历史文件删除功能
- 增加安全性