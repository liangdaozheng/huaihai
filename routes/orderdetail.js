//引进模块 创建路由 
const express=require("express");
var router=express.Router();
var query=require("./query");
///添加订单的内容
router.get("/add",(req,res)=>{
  var uid=req.session.uid;
  var wid=req.query.wid;
  var oid=req.query.oid;
  var count=req.query.count;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  if(!wid){
    res.send(JSON.stringify({code:-1,msg:"wid required"}));
    return;
  };
  if(!oid){
    res.send(JSON.stringify({code:-1,msg:"oid required"}));
    return;
  };
  if(!count){
    res.send(JSON.stringify({code:-1,msg:"count required"}));
    return;
  };
  var sql=`INSERT INTO hh_order_detail VALUES(NULL, ${oid}, ${wid}, ${count},${uid})`;
  query(sql)
  .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"添加成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"添加失败"}))
    }
  })
  .catch(error=>console.log(error))
});
/////查找


module.exports=router;