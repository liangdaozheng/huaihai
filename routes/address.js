const express=require("express");
var router=express.Router();
var query=require("./query");
///1添加地址
router.get("/add",(req,res)=>{
  var receiver=req.query.receiver;	
  var province=req.query.province;	
  var city=req.query.city;	
  var county=req.query.county;	
  var address	=req.query.address;
  var cellphone=req.query.cellphone;
  var	fixedphone=req.query.fixedphone;
  var postcode=req.query.postcode;
  var tag=req.query.tag;
  var	is_default=req.query.is_default;
  var uid=req.session.uid;
  if(!receiver){
    res.send(JSON.stringify({code:1,msg:"receiver required"}));
    return;
  };
  if(!province){
    res.send(JSON.stringify({code:1,msg:"province required"}));
    return;
  };
  if(!city){
    res.send(JSON.stringify({code:1,msg:"city required"}));
    return;
  };
  if(!county){
    res.send(JSON.stringify({code:1,msg:"county required"}));
    return;
  };
  if(!address){
    res.send(JSON.stringify({code:1,msg:"address required"}));
    return;
  };
  if(!cellphone){
    res.send(JSON.stringify({code:1,msg:"cellphone required"}));
    return;
  };
  if(!uid){
    res.send(JSON.stringify({code:1,msg:"uid required"}));
    return;
  };
  if(!fixedphone){
    fixedphone=0;
  };
  if(!postcode){
    postcode=0;
  };
  if(!tag){
    tag=0;
  };
  if(!is_default){
    is_default=0;
  };
  var sql="INSERT INTO hh_receiver_address values (null,?,?,?,?,?,?,?,?,?,?,?)";
  query(sql,[uid,receiver,province,city,county,address,cellphone,uid,fixedphone,postcode,tag,is_default])
  .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"添加成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"添加失败"}))
    }
  })
  .catch(error=>console.log(error))
});
/////2修改默认地址
router.get("/updatedefault",(req,res)=>{
  var uid=req.session.uid;
  var is_default=req.query.is_default;
  var aid=req.query.aid;
  if(!uid){
    res.send(JSON.stringify({code:1,msg:"uid required"}));
    return;
  };
  if(!is_default){
    res.send(JSON.stringify({code:1,msg:"is_default required"}));
    return;
  };
  if(!aid){
    res.send(JSON.stringify({code:1,msg:"aid required"}));
    return;
  };
  var sql="UPDATE hh_receiver_address SET is_default=? WHERE uid=? AND aid=?";
  query(sql,[is_default,uid,aid])
  .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"修改成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"修改失败"}))
    }
  })
  .catch(error=>console.log(error))
});
////3删除地址
router.get("/del",(req,res)=>{
  var uid=req.session.uid;
  var aid=req.query.aid;
  if(!uid){
    res.send(JSON.stringify({code:1,msg:"uid required"}));
    return;
  };
  if(!aid){
    res.send(JSON.stringify({code:1,msg:"aid required"}));
    return;
  };
  var sql="DELETE FROM hh_receiver_address WHERE aid=? AND  uid=?";
  query(sql,[uid,cid])
  .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"删除成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"删除失败"}))
    }
  })
  .catch(error=>console.log(error))
});
//////4查看收货地址
router.get("/addlist",(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    res.send(JSON.stringify({code:1,msg:"uid required"}));
    return;
  };
  var sql="select * from hh_receiver_address where uid=?";
  query(sql,[uid])
  .then(result=>{
    res.send(JSON.stringify({code:1,msg:"查询成功",data:result}))
  })
  .catch(error=>console.log(error))
});
//////



module.exports=router;