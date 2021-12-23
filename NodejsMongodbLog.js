const express = require("express")
const ejs = require('ejs')
const app = express()
const mongoose = require('mongoose');

// mongoose.connect('mongodb://172.21.2.236:27017/190110910539');
// const schema = {
//     name: String,
//     age: Number,
//     health: String,
//     hobby: String
// }
// const Cat = mongoose.model('cat1', schema);
// const kitty = new Cat({ name: 'testZildjian' });
// kitty.save().then(() => console.log('meow!'));

app.use('/',express.static('public'))
app.use('/',express.static('photo'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded


//用户登录
var uname = ''
var pwd = ''
var vcode = ''
app.post('/login', function (req, res, next) {
    uname = req.body.username;
    pwd = req.body.password;
    vcode = req.body.vercode;
    // console.log('uname: ' + req.body.username)
    // console.log('pwd: ' + req.body.password)
    // console.log('vcode: ' + req.body.vercode)
    next();
})
app.use('/login', function (req, res, next) {
    if(uname === 'zff' && pwd === '123'){
        ejs.renderFile('public/index.html', {username: uname}, function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err){console.log(err)}
            else{
                res.send(str);
            }
        });
    }
    else {
        uname = ''
        console.log("Error.")
    }
    next();
})


//已登录则显示用户名
app.get("/loginCheck",(req,res) => {
    if(uname == '')res.send("未登录");
    else res.send(uname);
})


//下拉列表
app.get("/dropdown",(req,res) => {
    if(uname == '')res.send("<a class='dropdown-item' href='login.html'>登录</a> <a class='dropdown-item' href='reg.jsp'>注册</a>");
    else res.send("<a class='dropdown-item' href='changePwd.jsp'>修改密码</a> <a class='dropdown-item' onclick='logout()'>注销</a>"); 
})


//注销
app.get("/logout",(req,res) => {
    uname = '';
})

app.listen(10539)
