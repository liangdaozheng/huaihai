//引入express 模块
const express=require('express');
//引入连接池，连接数据库
const pool=require('../huaihai_pool.js');
//创建用户路由器
const router=express.Router();
//测试连接接收请求的路由,测试连接mysql库
router.get('/huaihai',function(req,res){
	console.log('你连上我了');
	var sql="SELECT * FROM hh_user WHERE uid=? ";
	pool.query(sql,[req.query.uid],function(err,result){
		if(err) throw err;
		console.log(result);
		res.send(result);
	});
});
//接收注册页面的请求 login
//登录路由
router.post('/login',function(req,res){
	console.log('你连上我了');
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send([{code:400,msg:'uname required'}]);
		return;
	};
	if(!$upwd){
		res.send([{code:400,msg:'upwd required'}]);
		return;
	};
	var sql="select * from hh_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],function(err,result){
		if(err) throw err;
		if(result.length>0){
			res.send([{code:200,msg:'suc'}]);
		}else{
			res.send([{code:400,msg:'err'}]);
		};
	});
});
//登录用户名验证是否正确 getuname
router.post('/getuname',(req,res)=>{
	var $uname=req.body.uname;
	if(!$uname){
		res.send([{code:400,msg:'用户名不能为空'}]);
		return;
	};
	var sql="select * from hh_user where uname=?";
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send([{code:200,msg:'用户名正确'}]);
		}else{
			res.send([{code:400,msg:'用户名不存在'}]);
		};
	});
});
//用户列表查询admin中的请求 get_user_list
router.get('/get_user_list',(req,res)=>{
	console.log('你连上我了');
	var sql="select * from hh_user";
	pool.query(sql,[],(err,result)=>{
		res.send(result);
	});
});
//列表中删除用户信息admin中的请求 del_user
router.post('/del_user',(req,res)=>{
	var $uid=req.body.uid;
	if(!$uid){
		res.send([{code:400,msg:'uid required'}]);
		return;
	};
	var sql="delete from hh_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send([{code:200,msg:'suc'}]);
		}else{
			res.send([{code:400,mag:'err'}]);
		};
	});
});
//用户详情或检索admin中的请求 detail_user
router.get("/detail_user",(req,res)=>{
	var $uid=req.query.uid;
	if(!$uid){
		res.send([{code:400,msg:'uid resquired'}]);
		return;
	};
	var sql="select * from hh_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//用户修改 admin中的请求 update_user
router.post('/update_user',(req,res)=>{
	var obj=req.body;
	//console.log(obj);
	//判断数据是否为空
	for (var key in obj){
		if(!obj[key]){
			res.send([{code:400,msg:key+'required'}]);
			return;
		}
	}
	//连接数据库，修改内容
	var sql="update hh_user set uname=?,user_name=?,email=?,phone=?,gender=? where uid=?";
	pool.query(sql,[obj.uname,obj.user_name,obj.email,obj.phone,obj.gender,obj.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send([{code:200,msg:'suc'}]);
		}else{
			res.send([{code:400,msg:'err'}]);
		};
	});	
});
//管理员登录请求 admin 的请求 admin_login
router.post('/admin_login',(req,res)=>{
	var obj=req.body;
	//判断数据是否为空
	if(!obj.uname){
		res.send([{code:400,msg:'用户名不能为空'}]);
		return;
	};
	if(!obj.upwd){
		res.send([{code:400,msg:'密码不能为空'}]);
		return;
	};
	//创建连接，查询数据
	var sql="select * from hh_user where upwd=? and uname='admin' ";
	pool.query(sql,[obj.upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send([{code:200,msg:'suc'}]);
		}else{
			res.send([{code:400,msg:'如果需要请联系管理员'}]);
		};
	});
});
//注册页面的请求数据 reg_uname
router.post('/reg_uname',(req,res)=>{
	//检验数据是否为空
	var $uname=req.body.uname;
	if(!$uname){
		res.send([{code:400,msg:"用户名不能为空"}]);
		return;
	};
	//请求数据库数据验证
	var sql="select * from hh_user where uname=?";
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send([{code:400,msg:"用户名已存在"}]);
		}else{
			res.send([{code:200,msg:"用户名可用"}]);
		};
	});
});
//注册页面的数据的请求，注册用户
router.post('/register',(req,res)=>{
	var obj=req.body;
	for(var key in obj){
		if(!obj[key]){
			res.send([{code:400,msg:"信息有误，注册失败"}]);
			return;
		};
	}
	//添加数据到数据库，完成注册
	var sql="insert into hh_user set ?";
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send([{code:200,msg:"注册成功"}]);
		}else{
			res.send([{code:400,msg:"注册失败，请检查信息"}]);
		};
	});
});
//测试照片的请求 ceshi
router.get('/ceshi',(req,res)=>{
	var $tid=req.query.tid;
	pool.query("select * from hh_tatail_pics where tid=?",[$tid],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
});
//导出用户路由器供web服务器使用
module.exports=router;
