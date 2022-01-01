var express = require('express');
var router = express.Router();
var model = require('../model');

/* GET home page. */
router.get('/', function (req, res, next) {
  model.connect(function (db) {
    const blog = db.collection('blog');
    const users = db.collection('users');
    var mysort = { time: -1 }; //1为升序， -1为降序
    //查询除管理员外的用户列表
    users.find({userName: { $ne : 'admin' }}).toArray(function (err, resData) {
      if (err) {
        console.log('用户列表查询失败');
      } else {
        req.session.userList = resData;
      }
    });
    //查询博客列表
    blog.find({}).sort(mysort).toArray(function (err, resData) {
      if (err) {
        console.log('博客列表查询失败');
      } else {
        res.render('index', {
          userName: req.session.userName,
          blogList: resData,
          userList: req.session.userList,
          admin: req.session.admin
        });
      }
    });
  });
});

module.exports = router;