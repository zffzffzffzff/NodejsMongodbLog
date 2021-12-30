const ejs = require('ejs')
const mongoClient = require('mongodb').MongoClient;
const DBPATH = 'mongodb://172.21.2.236:27017/190110910539';
const DBNAME = '190110910539';
const functions = require('./module_functions')
var uname = '';

//用户注册
function insert_user(data, res) {
    mongoClient.connect(DBPATH, function (err, client) {
        if (err) console.log('数据库连接失败', err);
        else {
            const db = client.db(DBNAME);
            console.log('数据库连接成功');

            //查询用户名是否存在
            db.collection("t_users").find({username: data.username}).toArray(function(err, result) {
                if (err) throw err;
                console.log('查询成功: '+result.length); //结果为数组
                if(result.length > 0) {
                    client.close();
                    console.log('数据库已关闭');
                    ejs.renderFile('public/reg_info.html', {info: "用户名已存在!"}, function(err, str){
                        if(err){console.log(err)}
                        else res.send(str);
                    });
                }
                else {
                    //插入新用户
                    db.collection('t_users').insertOne(data, function (err, resData) {
                        if (err) console.log('注册失败-数据库异常', err);
                        else console.log('插入成功');
                        client.close();
                        console.log('数据库已关闭');
                        ejs.renderFile('public/login_info.html', {info: "注册成功,请登录!"}, function(err, str){
                            if(err){console.log(err)}
                            else res.send(str);
                        });
                    })
                }
            });
        }
    });
}


//用户登陆
function login_user(data, req, res) {
    mongoClient.connect(DBPATH, function (err, client) {
        if (err) console.log('数据库连接失败', err);
        else {
            const db = client.db(DBNAME);
            console.log('数据库连接成功');

            //查询用户名和密码是否正确
            db.collection("t_users").find({username: data.username, password: data.password}).toArray(function(err, result) {
                if (err) throw err;
                console.log('查询成功: '+result.length); //结果为数组
                //登陆成功
                if(result.length > 0) {
                    uname = data.username;
                    var whereStr = {"username": uname};  // 查询条件
                    var updateStr = {$set: {"last_visit" : functions.time()}};
                    //更新该用户最新一次登陆的时间
                    db.collection("t_users").updateOne(whereStr, updateStr,  function(err, res) {
                        if (err) throw err;
                        console.log("文档更新成功");
                        client.close();
                        console.log('数据库已关闭');
                    });
                    //跳转主页
                    ejs.renderFile('public/index.html', {}, function(err, str){
                        if(err){console.log(err)}
                        else res.send(str);
                    });
                }
                else {
                    client.close();
                    console.log('数据库已关闭');
                    ejs.renderFile('public/login_info.html', {info: "账号或密码不正确!"}, function(err, str){
                        if(err){console.log(err)}
                        else res.send(str);
                    });
                }
            });
        }
    });
}


//已登录则显示用户名
function loginCheck(res){
    if(uname == '')res.send("未登录");
    else res.send(uname);
}


//下拉列表
function get_dropdown(res){
    if(uname == '')res.send("<a class='dropdown-item' href='login.html'>登录</a> <a class='dropdown-item' href='reg.html'>注册</a>");
    else res.send("<a class='dropdown-item' href='changePwd.html'>修改密码</a> <a class='dropdown-item' onclick='logout()'>注销</a>"); 
}


//注销
function log_out(){
    uname = '';
}


//发布博客
function insert_blog(data, res) {
    if(uname == ''){
        ejs.renderFile('public/login_info.html', {info: "请先登陆！"}, function(err, str){
            if(err){console.log(err)}
            else res.send(str);
        });
    }
    else{
        mongoClient.connect(DBPATH, function (err, client) {
            if (err) console.log('数据库连接失败', err);
            else {
                const db = client.db(DBNAME);
                console.log('数据库连接成功');
                data.author = uname;
                //把博客信息录入数据库
                db.collection('t_blogs').insertOne(data, function (err, result) {
                    if (err) console.log('发布失败-数据库异常', err);
                    else console.log('发布成功');

                    client.close();
                    console.log('数据库已关闭');
                    ejs.renderFile('public/success.html', {blogId: ''}, function(err, str){
                        if(err){console.log(err)}
                        else res.send(str);
                    });
                })
            }
        });
    }
}


//清空collection
function clear_col(col) {
    mongoClient.connect(DBPATH, function (err, client) {
        if (err) console.log('数据库连接失败', err);
        else {
            const db = client.db(DBNAME);
            console.log('数据库连接成功');
            db.collection(col).remove({}, function (err, result) {
                client.close();
                console.log('数据库已关闭');
            })
        }
    });
}


module.exports = {insert_user, login_user, loginCheck, get_dropdown, log_out, insert_blog, clear_col}

// mongoose.connect('mongodb://172.21.2.236:27017/190110910539');
// const schema = {
//     username: String,
//     password: String,
//     sex: String,
//     birth: String,
//     photo_name: String,
//     reg_time: Date,
//     last_visit: Date
// }
// const User = mongoose.model('t_user', schema);
// const kitty = new User({username: 'zff', password: '123'});
// kitty.save().then(() => console.log('meow!'));
// model名.find({查询条件}，callback(err, 查询结果)=>{})