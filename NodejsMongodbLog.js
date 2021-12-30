const express = require("express")
const ejs = require('ejs')
const app = express()
const DB = require('./module/module_db')
const functions = require('./module/module_functions')
const mongoose = require('mongoose');

app.use('/',express.static('public'))
app.use('/',express.static('photo'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded


//用户注册
app.post('/reg', function (req, res, next) {
    var repeat = req.body.repeat;
    const data = {
        user_id: functions.get_userId(), 
        username: req.body.username,
        password: req.body.password,
        sex: req.body.sex,
        birth: req.body.birth,
        photo_name: functions.random(1,5),
        reg_time: functions.time(),
        last_visit: new Date()
    };
    if(repeat != data.password) {
        ejs.renderFile('public/reg_info.html', {info: "两次输入的密码不一致!"}, function(err, str){
            if(err){console.log(err)}
            else res.send(str);
        });
    }
    else DB.insert_user(data, res);
});
  


//用户登陆
app.post('/login', function (req, res, next) {
    const data = {
        username: req.body.username,
        password: req.body.password,
        vcode: req.body.vercode
    };
    DB.login_user(data, res);
    
})


//已登录则显示用户名
app.get("/loginCheck",(req,res) => {
    DB.loginCheck(res);
})


//下拉列表
app.get("/dropdown",(req,res) => {
    DB.get_dropdown(res);
})


//注销
app.get("/logout",(req,res) => {
    DB.log_out();
})


//发布博客
app.post("/publish",(req,res) => {
    const data = {
        blog_id: functions.get_blogId(),
        author: '',
        title: req.body.title,
        body: req.body.body,
        time: functions.time(),
        pageview: 0,
        like: 0,
        comment: 0
    };
    DB.insert_blog(data, res);
})



// DB.clear_col("t_blogs");

// mongoose.connect('mongodb://172.21.2.236:27017/190110910539');
// const schema1 = {
    // user_id: Number,
    // username: String,
    // password: String,
    // sex: String,
    // birth: String,
    // photo_name: String,
    // reg_time: Date,
    // last_visit: Date
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

// model名.find({查询条件}，callback(err, 查询结果)=>{})


app.listen(10539)


