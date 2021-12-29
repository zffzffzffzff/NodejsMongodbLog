const ejs = require('ejs')
const mongoClient = require('mongodb').MongoClient;
const DBPATH = 'mongodb://172.21.2.236:27017/190110910539';
const DBNAME = '190110910539';
var uname = '';

//新用户录入
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
                            else{
                                res.send(str);
                            }
                        });
                    })
                }
            });
        }
    });
}


//用户登陆
function login_user(data, res) {
    mongoClient.connect(DBPATH, function (err, client) {
        if (err) console.log('数据库连接失败', err);
        else {
            const db = client.db(DBNAME);
            console.log('数据库连接成功');

            //查询用户名和密码是否正确
            db.collection("t_users").find({username: data.username, password: data.password}).toArray(function(err, result) {
                if (err) throw err;
                console.log('查询成功: '+result.length); //结果为数组
                if(result.length > 0) {
                    client.close();
                    console.log('数据库已关闭');
                    uname = data.username;
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


//生成[l,r)区间内的随机数
function random(l, r){
    // 生成的这个随机数是一个小数，我们可以将其乘以100，来得到1-100之内的数
    var num = Math.random()*100; 
    // 向下取整
    num = Math.floor(num);
    return num%(r-l)+l;
}


module.exports = {insert_user, login_user, loginCheck, 
    get_dropdown, log_out, random}

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