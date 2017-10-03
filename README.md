# Node-Position
一个十分养眼的占位图Node.js程序。

## 说明
    使用说明http://127.0.0.1:3000/random?w={width}&h={height}&t={text}

## 文档

### 使用

安装：

    yarn install

启动：

    node app.js

### 分类

#### /random 
随机图片，将从/pure及/coser中选取图片

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
* `t` 参数（可选）：需要设置的文字，目前不支持中文
* `s` 参数（可选）：是否显示图片上的文字，默认显示。可设置参数`false`
* `o` 参数（可选）：图片顺序

## 目录说明
* /res/ 放置图片源文件及图片输出文件
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

### v1.0.0

- 完善基本功能