var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 1、导入session
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');

var app = express();

// 在express 中使用ejs模板，，只需要建views/**.ejs文件就可以正常渲染了
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');// 配置模板引擎类型

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());//不使用签名的方式
app.use(express.static(path.join(__dirname, 'public')));


/************** 登录控制 ************/
// 2、session配置
app.use(session({
  secret: 'qf project',////签名，雨上文中cookie设置的签字字符串一致
  resave: false,      //一个请求在另一个请求结束时对session进行修改覆盖并保存，默认值为true，建议设为false
  saveUninitialized: true,  //无论是否使用session，默认只要对面发起请求，都会给客户端一个cookie
  cookie: {
    maxAge: 1000 * 60 * 20
  } // 指定登录会话的有效时长
}));

// 登录拦截，必须先登录
app.get('*', function (req, res, next) {
  const path = req.path;
  const userName = req.session.userName;
  if (path !== '/users/login' && path !== '/users/regist') {
    if (!userName) {
      res.redirect('/users/login');
    }
  }
  next();
});

/************** 登录控制 ************/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// mongoose.connect('mongodb://172.21.2.236:27017/190110910539');
// const schema1 = {
//     userId: Number,
//     userName: String,
//     userPwd: String,
//     sex: String,
//     birth: String,
//     reg_time: Date,
//     last_visit: Date
// }
// const User = mongoose.model('t_user', schema1);
// const kitty = new User({username: 'zff', password: '123'});
// kitty.save().then(() => console.log('meow!'));

// mongoose.connect('mongodb://172.21.2.236:27017/190110910539');
// const schema2 = {
//     blog_id: Number,
//     author: String,
//     title: String,
//     body: String,
//     time: Date,
//     pageview: Number,
//     like: Number,
//     comment: Number
// }
// const Blog = mongoose.model('t_blog', schema2);
// const kitty = new Blog({author: 'zww', title: 'xxx', body: 'xxxxxxxxxxxxxxxxxxxx'});
// kitty.save().then(() => console.log('meow!'));



module.exports = app;
app.listen(10539);