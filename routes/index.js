var express = require('express');
var router = express.Router();
var model = require('../model');

/* GET home page. */
router.get('/', function (req, res, next) {
  model.connect(function (db) {
    const blog = db.collection('blog');
    var mysort = { _id: 1 }; //1为升序， -1为降序
    blog.find({}).sort(mysort).toArray(function (err, resData) {
      if (err) {
        console.log('博客列表查询失败');
      } else {
        res.render('index', {
          userName: req.session.userName,
          blogList: resData
        });
      }
    });
  });
});

module.exports = router;