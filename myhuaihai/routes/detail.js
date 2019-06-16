//引入express模块
const express=require('express');
var router=express.Router();
//引入请求模块
var query=require("./query");
//详情get方法的请求
router.get("/",(req,res)=>{
  //创建发送出去的对象
  var output={};
  var wid=req.query.wid;
  var sql="select * from hh_wine where wid=? ";
  query(sql,[wid])
  .then(result=>{
    //获取单个商品的详细信息
    output.detail=result;
    //console.log(output.detail[0].tid);
    var sql="select * from hh_wine_pic where wid=?";
    return query(sql,[wid]);
  })
  .then(result=>{
    //大中小图片
    output.pics=result;
    var tid=output.detail[0].tid;
    var sql="select * from hh_tatail_pics where tid=?";
    return query(sql,[tid])
  })
  .then(result=>{
    //获取详情图片
    output.detailpic=result;
    res.send(JSON.stringify({code:1,msg:"查询成功",data:output}))
  })
  .catch(error=>console.log(error))
})

module.exports=router;
