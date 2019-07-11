//引进模块 创建路由 
const express=require("express");
var router=express.Router();
var query=require("./query");
router.post("/",(req,res)=>{
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  console.log(uname,upwd)
  if(!uname){
    res.send(JSON.stringify({code:-1,msg:"user-name required"}));
    return;
  };
  if(!upwd){
    res.send(JSON.stringify({code:-1,msg:"password required"}));
    return;
  };
  var sql="SELECT uid FROM hh_user WHERE uname=? AND upwd=md5(?)";
  query(sql,[uname,upwd])
  .then(result=>{
    if(result.length>0){
      req.session.uid=result[0].uid;
      console.log(req.session);
      res.send(JSON.stringify({code:1,msg:"登陆成功",data:{uid:result[0].uid}}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"登录失败"}))
    }
  })
  .catch(error=>console.log(error))
});
////
router.get("/mod",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  console.log(uname,upwd)
  if(!uname){
    res.send(JSON.stringify({code:-1,msg:"user-name required"}));
    return;
  };
  if(!upwd){
    res.send(JSON.stringify({code:-1,msg:"password required"}));
    return;
  };
  var sql="SELECT uid FROM hh_user WHERE uname=? AND upwd=md5(?)";
  query(sql,[uname,upwd])
  .then(result=>{
    if(result.length>0){
      req.session.uid=result[0].uid;
      console.log(req.session);
      res.send(JSON.stringify({code:1,msg:"登陆成功",data:{uid:result[0].uid}}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"登录失败"}))
    }
  })
  .catch(error=>console.log(error))
});
module.exports=router;
