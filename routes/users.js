var express = require('express');
var router = express.Router();

var model = require('../model');
var cache = require('../cache');
var utils = require('../share/utils');
var functions = require('../share/functions');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 登录路由
router.get('/login', function (req, res, next) {
  res.render('login', {
    info: ""
  })
});

// 注册路由
router.get('/regist', function (req, res, next) {
  res.render('regist', {})
});



// 注册接口
router.post('/regist', function (req, res, next) {
  const data = {
    userId: utils.getUuid(),
    userName: req.body.userName,
    userPwd: req.body.userPwd,
    sex: req.body.sex,
    birth: req.body.birth,
    time: functions.date()
  };
  model.connect(function (db) {
    const users = db.collection('users');
    users.insertOne(data, function (err, resData) {
      if (err) {
        console.log('注册失败-数据库异常');
        res.redirect('/users/regist');
      } else {
        console.log('注册成功');
        res.redirect('/users/login');
      }
    })
  });
});

// 登录接口
router.post('/login', function (req, res, next) {
  const data = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  model.connect(function (db) {
    const users = db.collection('users');
    users.find(data).toArray(function (err, resData) {
      if (err) {
        console.log('登录失败-数据库异常');
        res.redirect('/users/login');
      } else {
        if (resData.length > 0) {
          console.log('登录成功');
          // 缓存用户信息
          cache.setCache('userInfo', resData[0]);
          // 登录会话保持
          req.session.userName = data.userName;
          // 管理员身份确认
          if(data.userName == "admin")
            req.session.admin = true;
          else
            req.session.admin = false;
          res.redirect('/');
        } else {
          console.log('用户名或密码错误',data);
          res.render('login', {
            info: "用户名或密码错误！"
          })
        }
      }
    })
  });
})


// 修改密码
router.get('/changePwd', function (req, res, next) {
  res.render('changePwd', {
    info: ""
  })
});

router.post('/changePwd', function (req, res, next) {
  var oldPwd = req.body.oldPwd;
  var newPwd = req.body.newPwd;
  var repeat = req.body.repeat;
  var userName = req.session.userName;
  model.connect(function (db) {
    const users = db.collection('users');
    users.find({userName: userName, userPwd: oldPwd}).toArray(function (err, resData) {
      if (err) {
        console.log('查询失败');
      } else {
        if(resData.length==0){
          res.render('changePwd', {
            info: "原密码错误！"
          })
        } else {
          if(repeat != newPwd){
            res.render('changePwd', {
              info: "两次输入的密码不一致！"
            });
          }
          else {
            model.connect(function (db) {
              const users = db.collection('users');
              users.updateOne({userName: userName, userPwd: oldPwd}, {
                $set: {userPwd: newPwd}
              }, function (err, resData) {
                if (err) {
                  console.log('修改失败');
                } else {
                  res.render('login', {
                    info: "修改成功！请登陆！"
                  });
                }
              });
            })
          }
        }
      }
    });
  });
});



// 退出登录
router.get('/logOut', function (req, res, next) {
  console.log(req.session.userName)
  req.session.userName = '';
  res.redirect('/users/login');
});

module.exports = router;