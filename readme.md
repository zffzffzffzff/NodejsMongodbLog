# 一、项目设计使用说明书

### 1.项目设计部分

#### （1）项目总体构成

我的项目是一个博客系统，首先实现的是登陆注册功能，分为管理员和用户两种角色。用户登陆后可查看博客、发布博客、用关键字搜索博客、获取用户列表以及删除自己的博客，管理员在拥有以上功能的基础上还可以删除任意用户的博客。

#### （2）引入的包在项目中的作用相关说明

ejs：高效的嵌入式 JavaScript 模板引擎

mongodb：一个基于分布式文件存储的数据库

express：一个基于node.js平台的，快速，开放，极简的web开发框架

bootstrap4：HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目

#### （3）项目目录结构和各个部分的说明

![image-20220101041353759](/home/user1/.config/Typora/typora-user-images/image-20220101041353759.png)

views：存放主要的页面视图

cache：存放一些缓存的数据

route：存放实现跳转和信息传递的js文件

share：存放一些自定义函数，如获取当前时间的函数

model：存放数据库连接入口文件

public：存放一些项目图片和bookstrap4框架

### 2.使用说明书

- 注册

  ![image-20220101043816831](/home/user1/.config/Typora/typora-user-images/image-20220101043816831.png)

- 登陆

  ![image-20220101043715231](/home/user1/.config/Typora/typora-user-images/image-20220101043715231.png)

  密码错误时会显示：

  ![image-20220101044311817](/home/user1/.config/Typora/typora-user-images/image-20220101044311817.png)

- 主页：

  ![image-20220101044432573](/home/user1/.config/Typora/typora-user-images/image-20220101044432573.png)

- 点击左上角创作中心可以编辑博客

  ![image-20220101044536841](/home/user1/.config/Typora/typora-user-images/image-20220101044536841.png)

- 右下角点击发布后显示博客信息

  ![image-20220101044635595](/home/user1/.config/Typora/typora-user-images/image-20220101044635595.png)

- 回到主页也可以看见自己刚刚发布的博客

![image-20220101044845085](/home/user1/.config/Typora/typora-user-images/image-20220101044845085.png)

- 右上角点击展开

  ![image-20220101044949555](/home/user1/.config/Typora/typora-user-images/image-20220101044949555.png)

- 点击我的博客：

  ![image-20220101045103161](/home/user1/.config/Typora/typora-user-images/image-20220101045103161.png)

- 点击修改密码：

  ![image-20220101045208425](/home/user1/.config/Typora/typora-user-images/image-20220101045208425.png)

  修改成功后重新登陆：

  ![image-20220101045324505](/home/user1/.config/Typora/typora-user-images/image-20220101045324505.png)

- 搜索功能：

  ![image-20220101045625177](/home/user1/.config/Typora/typora-user-images/image-20220101045625177.png)

- 管理员博客管理界面：

  ![image-20220101045714088](/home/user1/.config/Typora/typora-user-images/image-20220101045714088.png)

# 二、开发日记

1. 测试remote
2. 增加index.html
3. 导入express
4. 导入mongoose
5. 导入bootstrap4
6. 增加登陆页面
7. 导入ejs，更新登陆页面，完成简单的登陆和登出功能
8. 新增注册和创作中心页面
9. 完成连接数据库的登陆和注册
10. 新增博客信息页面，完成发布博客功能
11. 把html都改成ejs，实现博客列表的显示
12. 完成搜索功能，新增管理员角色，完成项目