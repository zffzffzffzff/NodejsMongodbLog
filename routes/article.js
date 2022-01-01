var express = require('express');
var router = express.Router();

var model = require('../model');
var cache = require('../cache');
var utils = require('../share/utils');
var functions = require('../share/functions');

// 博客查询
router.get('/query', function (req, res, next) {
  model.connect(function (db) {
    const blog = db.collection('blog');
    var mysort = { time: -1 }; //1为升序， -1为降序
    var query = req.query.search;
    const condition = {
      $or: [
        {"userName": {$regex:query}},
        {"title": {$regex:query}},
        {"content": {$regex:query}}
      ]
    }
    blog.find(condition).sort(mysort).toArray(function (err, resData) {
      if (err) {
        console.log('博客列表查询失败');
        res.redirect('/');
      } else {
        res.render('blogList', {
          userName: req.session.userName,
          blogList: resData,
          userList: req.session.userList,
          admin: req.session.admin
        });
      }
    });
  });
});



// 新增博客
router.get('/listAdd', function (req, res, next) {
  res.render('listAdd', {
    userName: req.session.userName,
    userList: req.session.userList,
    admin: req.session.admin
  });
});

router.post('/listAdd', function (req, res, next) {
  const userInfo = cache.getCache('userInfo');
  const data = {
    userId: userInfo.userId,
    userName: userInfo.userName,
    blogId: utils.getUuid(),
    title: req.body.title,
    content: req.body.content,
    time: functions.time()
  };
  model.connect(function (db) {
    const blog = db.collection('blog');
    blog.insertOne(data, function (err, resData) {
      if (err) {
        console.log('新增博客失败');
        res.redirect('/');
      } else {
        const condition = {
          userId: userInfo.userId,
          blogId: data.blogId
        }
        model.connect(function (db) {
          const blog = db.collection('blog');
          blog.find(condition).toArray(function (err, resData) {
            if (err) {
              console.log('博客查询失败');
              res.redirect('/');
            } else {
              res.render('blogInfo', {
                blogInfo: resData,
                userName: req.session.userName,
                userList: req.session.userList,
                admin: req.session.admin
              });
            }
          });
        });
      }
    });
  });
})


// 博客管理
router.get('/admin', function (req, res, next) {
  model.connect(function (db) {
    const blog = db.collection('blog');
    var mysort = { time: -1 }; //1为升序， -1为降序
    blog.find({}).sort(mysort).toArray(function (err, resData) {
      if (err) {
        console.log('博客列表查询失败');
      } else {
        res.render('admin', {
          userName: req.session.userName,
          blogList: resData,
          userList: req.session.userList,
          admin: req.session.admin
        });
      }
    });
  });
});


// 我的博客
router.get('/myBlog', function (req, res, next) {
  model.connect(function (db) {
    const blog = db.collection('blog');
    var mysort = { time: -1 }; //1为升序， -1为降序
    blog.find({userName: req.session.userName}).sort(mysort).toArray(function (err, resData) {
      if (err) {
        console.log('博客列表查询失败');
      } else {
        res.render('myBlog', {
          userName: req.session.userName,
          blogList: resData,
          userList: req.session.userList,
          admin: req.session.admin
        });
      }
    });
  });
});


// 删除博客（管理员）
router.post('/blogDelete', function (req, res, next) {
  const condition = {
    blogId: req.body.blogId
  };
  model.connect(function (db) {
    const blog = db.collection('blog');
    blog.deleteOne(condition, function (err, resData) {
      if (err) {
        console.log('删除博客失败');
      } else {
        res.redirect('/article/admin');
      }
    });
  });
});


// 删除自己的博客
router.post('/myBlogDelete', function (req, res, next) {
  const condition = {
    blogId: req.body.blogId
  };
  model.connect(function (db) {
    const blog = db.collection('blog');
    blog.deleteOne(condition, function (err, resData) {
      if (err) {
        console.log('删除博客失败');
      } else {
        res.redirect('/article/myBlog');
      }
    });
  });
});


module.exports = router;