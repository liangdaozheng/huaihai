//引入express模块
const express=require('express');
//引入第三方模块body-parser(为post的请求服务)
const bodyParser=require('body-parser');
//引入cors模块 解决跨域问题
const cors=require('cors');
//引入用户路由器
const userRouter=require('./routes/user.js');
//引入首页商品路由器
const index=require('./routes/index.js')
//创建怀海服务器
var server=express();
//贴标签 伪装跨域
server.use(cors({
  origin:"http://127.0.0.1:5500",
  credentials:true
}))
//创建监听端口（8080）

server.listen(8080);


//托管静态资源
server.use(express.static('public'));
server.use(express.static('admin'));

//使用bodyParser解决post的请求
server.use(bodyParser.urlencoded({extended:false}));
//挂载用户路由
server.use('/user',userRouter);
//挂载首页路由
server.use('/index',index);



