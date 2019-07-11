//引进模块 创建路由 
const express=require("express");
var router=express.Router();
var query=require("./query");
router.post('/',(req,res)=>{
  var obj=req.body;
  //console.log(obj);
  //简单判断
  for(var key in obj){
    //console.log(obj[key]);
    if(!obj[key]){
      res.send(JSON.stringify({code:-1,msg:key+" Required"}))
      return;
    }
  };
  //插入数据库
  var sql=`INSERT INTO hh_user(uname,email,phone,upwd) values (?,?,?,md5(?))`;
  query(sql,[obj.uname,obj.email,obj.phone,obj.upwd])
  .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"register suc"}));
    }else{
      res.send(JSON.stringify({code:-1,msg:"register err"}));
    }
  })
  .catch(error=>console.log(error))
});
module.exports=router;
