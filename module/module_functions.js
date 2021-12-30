//生成[l,r)区间内的随机数
function random(l, r){
    // 生成的这个随机数是一个小数，我们可以将其乘以100，来得到1-100之内的数
    var num = Math.random()*100; 
    // 向下取整
    num = Math.floor(num);
    return num%(r-l)+l;
}


//获取当前时间
function time(){
    var date = new Date();
    var year = date.getFullYear();        //年 ,从 Date 对象以四位数字返回年份
    var month = date.getMonth() + 1;      //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
    var day = date.getDate();             //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
    var hours = date.getHours();          //小时 ,返回 Date 对象的小时 (0 ~ 23)
    var minutes = date.getMinutes();      //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
    var seconds = date.getSeconds();      //秒 ,返回 Date 对象的秒数 (0 ~ 59)   
    
    //当前系统时间  
    // var currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    // console.log(currentDate);
    
    //修改格式(yyyy-mm-dd hh:mm:ss)
    if (month >= 1 && month <= 9) month = "0" + month;
    if (day >= 0 && day <= 9) day = "0" + day;
    if (hours >= 0 && hours <= 9) hours = "0" + hours;
    if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes;
    if (seconds >= 0 && seconds <= 9) seconds = "0" + seconds;
    
    //当前系统时间(格式化)
    var currentFormatDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    // console.log(currentFormatDate);

    return currentFormatDate;
}


//生成用户id
function get_userId() {
    return "user" + new Date().getTime().toString();
}


//生成博客id
function get_blogId() {
    return "blog" + new Date().getTime().toString(); 
}



module.exports = {random, time, get_userId, get_blogId}

