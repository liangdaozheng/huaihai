//商品列表页接口
//引入express模块
const express=require('express');
var router=express.Router();
//引入请求模块
var query=require("./query");
router.get("/",(req,res)=>{
  var fid=req.query.fid;
  //console.log(fid) 创建返回对象
  var output={};
  var sql="select * from hh_wine where fid=?";
  query(sql,[fid])
  .then(result=>{
    //所有的酒信息发送
    output.wines=result;
    //console.log(result)
    //获取wid 获取图片信息
    var wids=[];
    for (var wine of result){
      wids.push(wine.wid);
    };
    wids.toString();
    //console.log(wids);
    var sql=`select wid,sm,md from hh_wine_pic where wid in (${wids})`;
    return query(sql)
  })
  .then(result=>{
    output.pics=result;
    var sql="select fid,fname from hh_wine_family where fid=?";
    return query(sql,[fid])
  })
  .then(result=>{
    output.fname=result;
    res.send(JSON.stringify({code:1,msg:"查询成功",data:output}))
  })
  .catch(error=>console.log(error))
})

module.exports=router