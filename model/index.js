const mongoClient = require('mongodb').MongoClient; // 注意这里是大写，否则访问不到connect会报错

const DBPATH = 'mongodb://172.21.2.236:27017/190110910539';
const DBNAME = '190110910539';

const connect = function (callFun) {
  mongoClient.connect(DBPATH, function (err, client) {
    if (err) {
      console.log('数据库连接失败', err);
    } else {
      const db = client.db(DBNAME);
      callFun && callFun(db);
      client.close();
    }
  });
}

module.exports = {
  connect
}