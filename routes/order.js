////订单模块
const express=require("express");
var router=express.Router();
var query=require("./query");
////生成订单
router.get("/add",(req,res)=>{
  var uid=req.session.uid;
  var aid=req.query.aid;
  var status=req.query.status;
  var order_time=req.query.order_time;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  if(!aid){
    res.send(JSON.stringify({code:-1,msg:"aid required"}));
    return;
  };
  if(!status){
    res.send(JSON.stringify({code:-1,msg:"status required"}));
    return;
  };
  if(!order_time){
    res.send(JSON.stringify({code:-1,msg:"order_time required"}));
    return;
  };
  var sql=`INSERT INTO hh_order(oid,uid,aid,status,order_time) VALUES(NULL, ${uid}, ${aid}, ${status},${order_time})`;
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
////2查询订单
router.get("/orderlist",(req,res)=>{
  var uid=req.session.uid;
  var output={};
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  var sql=`SELECT * FROM hh_order WHERE uid=? `;
  query(sql,[uid])
  .then(result=>{
    output.orders=result;
    var aids=[];
    for (var address of result){
      aids.push(address.aid);
    };
    aids.toString();
    
    var sql=`select * from hh_receiver_address where aid in (${aids})`;
    return query(sql)
  })
  .then(result=>{
    output.address=result;
    res.send(JSON.stringify({code:1,msg:"查询成功",data:output}))
  })
  .catch(error=>console.log(error))
})
//////修改付钱
router.get("/pay",(req,res)=>{
  var uid=req.session.uid;
  var oid=req.query.oid;
  var pay_time=req.query.pay_time;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  if(!pay_time &&pay_time!=null){
    res.send(JSON.stringify({code:-1,msg:"pay_time required"}));
    return;
  };
  if(!oid){
    res.send(JSON.stringify({code:-1,msg:"oid required"}));
    return;
  };
   var sql="select pay_time from hh_order where uid=? and oid=?";
   query(sql,[uid,oid])
   .then(result=>{
     //console.log(result)
     if(result[0].pay_time!=null){
       res.send({code:1,msg:"无权修改"});
       
     }else{
       var sql="UPDATE hh_order SET pay_time=? WHERE uid=? AND oid=?";
       return query(sql,[pay_time,uid,oid])
     }
   })
   .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"修改成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"修改失败"}))
    }
   })
   .catch(error=>console.log(error))
});
/////修改状态
router.get("/deliver",(req,res)=>{
  var uid=req.session.uid;
  var oid=req.query.oid;
  var deliver_time=req.query.deliver_time;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  if(!deliver_time){
    res.send(JSON.stringify({code:-1,msg:"deliver_time required"}));
    return;
  };
  if(!oid){
    res.send(JSON.stringify({code:-1,msg:"oid required"}));
    return;
  };
  var sql="select pay_time from hh_order where uid=? and oid=?";
   query(sql,[uid,oid])
   .then(result=>{
     //console.log(result)
     if(result[0].pay_time!=null){
       res.send({code:1,msg:"无权修改"});  
     }else{
       var sql="UPDATE hh_order SET deliver_time=? WHERE uid=? AND oid=?";
       return query(sql,[deliver_time,uid,oid])
     }
   })
   .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"修改成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"修改失败"}))
    }
   })
   .catch(error=>console.log(error))
});
/////
router.get("/recerived",(req,res)=>{
  var uid=req.session.uid;
  var oid=req.query.oid;
  var recerived_time=req.query.recerived_time;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  if(!recerived_time){
    res.send(JSON.stringify({code:-1,msg:"recerived_time required"}));
    return;
  };
  if(!oid){
    res.send(JSON.stringify({code:-1,msg:"oid required"}));
    return;
  };
  var sql="select pay_time from hh_order where uid=? and oid=?";
   query(sql,[uid,oid])
   .then(result=>{
     //console.log(result)
     if(result[0].pay_time!=null){
       res.send({code:1,msg:"无权修改"});  
     }else{
       var sql="UPDATE hh_order SET recerived_time=? WHERE uid=? AND oid=?";
       return query(sql,[recerived_time,uid,oid])
     }
   })
   .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"修改成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"修改失败"}))
    }
   })
   .catch(error=>console.log(error))
});
//////
router.get("/status",(req,res)=>{
  var uid=req.session.uid;
  var oid=req.query.oid;
  var status=req.query.status;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  if(!status){
    res.send(JSON.stringify({code:-1,msg:"status required"}));
    return;
  };
  if(!oid){
    res.send(JSON.stringify({code:-1,msg:"oid required"}));
    return;
  };
  var sql="select pay_time from hh_order where uid=? and oid=?";
   query(sql,[uid,oid])
   .then(result=>{
     //console.log(result)
     if(result[0].pay_time!=null){
       res.send({code:1,msg:"无权修改"});  
     }else{
       var sql="UPDATE hh_order SET status=? WHERE uid=? AND oid=?";
       return query(sql,[status,uid,oid])
     }
   })
   .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"修改成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"修改失败"}))
    }
   })
   .catch(error=>console.log(error))
});
/////删除订单
router.get("/del",(req,res)=>{
  var uid=req.session.uid;
  var oid=req.query.oid;
  if(!uid){
    res.send(JSON.stringify({code:-1,msg:"login required"}));
    return;
  };
  if(!oid){
    res.send(JSON.stringify({code:-1,msg:"oid required"}));
    return;
  };
  var sql="select pay_time from hh_order where uid=? and oid=?";
   query(sql,[uid,oid])
   .then(result=>{
     //console.log(result)
     if(result[0].pay_time!=null){
       res.send({code:1,msg:"无权删除"});  
     }else{
       var sql="DELETE FROM hh_order WHERE oid=? AND  uid=?";
       return query(sql,[oid,uid])
     }
   })
   .then(result=>{
    if(result.affectedRows>0){
      res.send(JSON.stringify({code:1,msg:"删除成功"}))
    }else{
      res.send(JSON.stringify({code:-1,msg:"删除失败"}))
    }
   })
   .catch(error=>console.log(error))
})
//////

module.exports=router;