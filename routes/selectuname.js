//引进模块 创建路由 
const express=require("express");
var router=express.Router();
var query=require("./query");
router.get("/",(req,res)=>{
  var uname=req.query.uname;
  //console.log(uname);
  var sql=`select uid from hh_user where uname=?`;
  query(sql,[uname])
  .then(result=>{
    //console.log(result)
    if(result.length>0){
      res.send(JSON.stringify({code:1,msg:"用户名已注册"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"用户名未注册"}))
    }
  })
  .catch(error=>console.log(error))
});
////查手机号改密码
router.get("/phone",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  //console.log(uname);
  var sql=`select uid,phone,uname from hh_user where uid=?`;
  query(sql,[uid])
  .then(result=>{
    //console.log(result)
    if(result.length>0){
      res.send(JSON.stringify({code:1,msg:"查询成功",data:result}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"查询失败"}))
    }
  })
  .catch(error=>console.log(error))
});
module.exports=router;