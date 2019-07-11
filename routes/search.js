const express=require("express");
var router=express.Router();
var query=require("./query");
router.use("/",(req,res)=>{
  var kw=req.query.kw;
  var output={};
  var kws=kw.split(" ");
  kws.forEach((elem,i,arr)=>{
    arr[i]=`fname like '%${elem}%'`;
  });
  var where=kws.join(" and ");
  var sql=`SELECT fid FROM hh_wine_family WHERE ${where} `;
  query(sql)
  .then(result=>{
    output.fids=result;
    res.send(JSON.stringify({code:1,msg:"查询成功",data:output}));
  })
  .catch(error=>console.log(error))
});

module.exports=router;

