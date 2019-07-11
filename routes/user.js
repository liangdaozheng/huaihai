//引入express 模块
const express=require('express');
//引入连接池，连接数据库
const pool=require('../huaihai_pool.js');
var query=require("./query");
//创建用户路由器
const router=express.Router();
//测试连接接收请求的路由,测试连接mysql库
router.get('/huaihai',function(req,res){
	//console.log('你连上我了');
	var uid=req.session.uid;
	if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
	};
	var sql="SELECT * FROM hh_user WHERE uid=? ";
	pool.query(sql,[uid],function(err,result){
		if(err) throw err;
		//console.log(result);
		res.send(JSON.stringify({code:1,msg:"查询成功",data:result}));
	});
});
//修改个人信息 
router.post("/updatemsg",(req,res)=>{
	var uid=req.session.uid;
	var user_name=req.body.user_name;
	var gender=req.body.gender;
	var phone=req.body.phone;
	var birthday=req.body.birthday;
	var email=req.body.email;
	if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
	};
	if(!user_name){
    res.send(JSON.stringify({code:-1,msg:"user_name required"}));
    return;
	};
	if(!gender){
    res.send(JSON.stringify({code:-1,msg:"gender required"}));
    return;
	};
	if(!phone){
    res.send(JSON.stringify({code:-1,msg:"phone required"}));
    return;
	};
	if(!birthday){
    res.send(JSON.stringify({code:-1,msg:"birthday required"}));
    return;
	};
	if(!email){
		res.send(JSON.stringify({code:-1,msg:"email required"}));
    return;
	};
	var sql=`UPDATE hh_user SET email=?,phone=?,gender=?,user_name=?,birthday=? WHERE uid=?`;
	query(sql,[email,phone,gender,user_name,birthday,uid])
	.then(result=>{
		if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"修改成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"修改失败"}))
    }
	})
	.catch(error=>console.log(error))
});
/////修改密码
router.post("/updatepw",(req,res)=>{
	var uid=req.session.uid;
	var upwd=req.body.upwd;
	if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
	};
	if(!upwd){
    res.send(JSON.stringify({code:-1,msg:"upwd required"}));
    return;
	};
	var sql=`UPDATE hh_user SET upwd=md5(?) WHERE uid=?`;
	query(sql,[upwd,uid])
	.then(result=>{
		if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"修改成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"修改失败"}))
    }
	})
	.catch(error=>console.log(error))
});
//////////上传头像
router.get("/del",(req,res)=>{
	var uid=req.query.uid;
	if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
	};
	var sql="delete from hh_user where uid=?";
	query(sql,[uid])
	.then(result=>{
		if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"删除成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"删除失败"}))
    }
	})
	.catch(error=>console.log(error))
})


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




//导出用户路由器供web服务器使用
module.exports=router;
