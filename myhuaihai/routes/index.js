//引入express模块
const express=require("express");
var router=express.Router();
var pool=require("../huaihai_pool.js");
//接收请求
router.get('/',(req,res)=>{
  //两个数据表，打包一个数据包发出
  var output={
    carousel:[],
    products:[]
  };
  //查询数据，轮播图的数据表
  var sqlc='select * from hh_index_carousel';
  pool.query(sqlc,[],(err,result)=>{
    if(err) console.log(err);
    output.carousel=result;
    //首页商品的数据包
    var sqlp='select * from hh_index_product';
    pool.query(sqlp,[],(err,result)=>{
      if(err) console.log(err);
      output.products=result;
      //数据打包好统一发出
      res.send(JSON.stringify(output))
    }) 
  })
})


module.exports=router;