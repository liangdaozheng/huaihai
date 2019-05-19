//引入express模块
const express=require('express');
//引入第三方模块body-parser(为post的请求服务)
const bodyParser=require('body-parser');
//引入用户路由器
const userRouter=require('./routes/user.js');
//创建怀海服务器
var server=express();
//创建监听端口（8080）
server.listen(8080);
//托管静态资源
server.use(express.static('public'));
server.use(express.static('admin'));
//server.use(express.static('huaihai_images'));
//server.use(express.static('css'));
//server.use(express.static('javascript'));
//使用bodyParser解决post的请求
server.use(bodyParser.urlencoded({extended:false}));
//挂载用户路由
server.use('/user',userRouter);

