//引进模块 创建路由 
const express=require("express");
var router=express.Router();
var query=require("./query");
router.get("/",(req,res)=>{
  var pno=req.query.pno;
  var ps=req.query.ps;
  var output={};
  if(!pno||pno<1){pno=1};
  if(!ps){ps=5};
  var sql="SELECT * FROM hh_wine LIMIT ?,?";
  pno=parseInt(pno);
  var offset=(pno-1)*ps;
  ps=parseInt(ps);
  query(sql,[offset,ps])
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
    res.send(JSON.stringify({code:1,msg:"查询成功",data:output}))
  })
  .catch(error=>console.log(error))
});

module.exports=router;
