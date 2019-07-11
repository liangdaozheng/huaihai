//引入express模块
const express=require('express');
//引入第三方模块body-parser(为post的请求服务)
const bodyParser=require('body-parser');
//引入cors模块 解决跨域问题
const cors=require('cors');
const session = require("express-session");
const multer=require("multer");
const multiparty=require("connect-multiparty");

//引入用户路由器
var  userRouter=require('./routes/user.js');
//引入首页商品路由器
var index=require('./routes/index.js');
//引入商品详情页数据
var detail=require('./routes/detail');
//引入商品列表页
var productlist=require('./routes/productlist');
//引入用户名查询
var selectuname=require('./routes/selectuname');
//引入用户注册
var register=require('./routes/register');
//引入登录
var signin=require('./routes/signin');
//引入退出
var signout=require('./routes/signout');
//手机端加载更多
var productmore=require('./routes/productmore');
//引入购物车
var cart=require('./routes/cart');
///引入订单地址
var address=require('./routes/address');
//引入订单
var order=require('./routes/order');
///上传头像
var avatar=require('./routes/avatar');
//搜索产品
var search=require('./routes/search');




//创建怀海服务器
var server=express();
//贴标签 伪装跨域
server.use(cors({
 origin:["http://127.0.0.1:5500","http://localhost:8100","http://127.0.0.1:8080"],
  credentials:true
}))
//创建监听端口（8080）

server.listen(8080);


//托管静态资源
server.use(express.static('public'));
server.use(express.static('admin'));

//添加session功能
server.use(session({
  secret:'huaihaishopping',
  cookie:{maxAge:60*1000*300},//过期时长3h
  resave:true,
  saveUninitialized:false,
}));

server.use(multiparty({
  uploadDir:"./public/img/avatar"
}))

////手机ng请求
server.use(bodyParser.json());
//使用bodyParser解决post的请求 //react的请求
server.use(bodyParser.urlencoded({extended:false}));
//挂载用户路由
server.use('/user',userRouter);
//挂载首页路由
server.use('/index',index);
//挂载商品详情路由
server.use('/detail',detail);
//挂载商品列表页路由
server.use('/productlist',productlist);
//挂载用户名查询路由
server.use('/selectuname',selectuname);
//挂载用户注册路由
server.use('/register',register);
//挂载登录路由
server.use('/signin',signin);
//挂载退出路由
server.use('/signout',signout);
//挂载手机端加载更多路由
server.use('/productmore',productmore);
//挂载购物车路由
server.use('/cart',cart);
//挂载地址路由
server.use('/address',address);
//挂载订单路由
server.use('/order',order);
///挂载上传头像路由
server.use('/avatar',avatar);
//挂载搜索路由
server.use('/search',search);


