const express = require ('express');
const path = require ('path');
const fs = require('fs');
const favicon = require ('serve-favicon');
const logger = require ('morgan');
const cookieParser = require ('cookie-parser');
const bodyParser = require ('body-parser');

//读取配置文件
let setting = null;
try {
  setting = JSON.parse(fs.readFileSync("./setting.json", 'utf-8'));
} catch (err) {
  console.log('Error:' + '未找到配置文件\n' + err);
  return;
}

//路由
const index = require ('./routes/index');
const users = require ('./routes/users');
const random = require ('./routes/random');
const pure = require ('./routes/pure');
const sexy = require ('./routes/sexy');
const coser = require ('./routes/coser');

const app = express ();

// view engine setup
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use (logger ('dev'));
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));
app.use (cookieParser ());
app.use (express.static (path.join (__dirname, 'public')));

app.use ('/', index);
app.use ('/pure', pure);
app.use ('/random', random);
app.use ('/sexy', sexy);
app.use ('/users', users);
app.use ('/coser', coser);

// catch 404 and forward to error handler
app.use (function (req, res, next) {
  let err = new Error ('Not Found');
  err.status = 404;
  next (err);
});

// error handler
app.use (function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get ('env') === 'development' ? err : {};

  // render the error page
  res.status (err.status || 500);
  res.render ('error');
});

module.exports = app;
