const express=require('express');
var query=require("./query");
var router=express.Router();
//1.添加购物车
router.get('/add',(req,res)=>{
    var obj=req.query;
    var wid=obj.wid;
    var count=obj.count;
    var uid=req.session.uid;
    console.log(req.session);
    if(!obj.wid){
        res.send(JSON.stringify({code:-1,msg:'wid required'}));
        return;
    }
    if(!obj.count){
        res.send(JSON.stringify({code:-1,msg:'count required'}));
        return;
    }
    if(!req.session.uid){
        res.send(JSON.stringify({code:-1,msg:'login required'}));
        return;
    }
    var sql=`SELECT cid FROM hh_shopping_cart WHERE uid=? AND wid=?`;
    query(sql,[uid,wid])
    .then(result=>{
        var sql=``;
        if(result.length>0){
         sql=`UPDATE hh_shopping_cart SET count=count+${count} WHERE uid=${uid} AND wid=${wid}`;  
        }else{
        sql=`INSERT INTO hh_shopping_cart VALUES(NULL, ${uid}, ${wid}, ${count}, false)`;    
        };
        return query(sql);
    })
    .then(result=>{
        if(result.affectedRows>0){
            res.send(JSON.stringify({code:1,msg:"添加成功"}))
        }else{
            res.send(JSON.stringify({code:-1,msg:"添加失败"}))
        }
    })
    .catch(error=>console.log(error))
});
////2购物车列表
router.get("/list",(req,res)=>{
    var output={};
    var uid=req.session.uid;
    if(!uid){
        res.send(JSON.stringify({code:-1,msg:"login required"}));
        return;
    };
    var sql=`select * from hh_shopping_cart where uid=?`;
    query(sql,[uid])
    .then(result=>{
        output.cart=result;
        var wids=[];
        for (var wine of output.cart){
        wids.push(wine.wid);
        };
        wids.toString();
        var sql=`select wid,sm from hh_wine_pic where wid in (${wids})`;
        return query(sql)
    })
    .then(result=>{
        output.pics=result;
        var wids=[];
        for (var wine of output.cart){
        wids.push(wine.wid);
        };
        wids.toString();
        var sql=`select wid,pname,price,promise,is_onsale from hh_wine where wid in (${wids})`;
        return query(sql)
    })
    .then(result=>{
        output.wins=result;
        res.send(JSON.stringify({code:1,msg:"查询成功",data:output}))
    })
    .catch(error=>console.log(error))
});
/////3删除购物车
router.get('/del',(req,res)=>{
    var uid=req.session.uid;
    var cid=req.query.cid;
    if(!uid){
        res.send(JSON.stringify({code:-1,msg:"login required"}));
        return;
    };
    if(!cid){
        res.send(JSON.stringify({code:-1,msg:"cid required"}));
        return;
    }
    var sql="DELETE FROM hh_shopping_cart WHERE cid=? AND  uid=?";
    query(sql,[cid,uid])
    .then(result=>{
        if(result.affectedRows>0){
            res.send(JSON.stringify({code:1,msg:"删除成功"}))
        }else{
            res.send(JSON.stringify({code:-1,msg:"删除失败"}))
        }
    })
    .catch(error=>console.log(error))
});
////4修改购物车条目中的购买数量
router.get("/updatecount",(req,res)=>{
    var uid=req.session.uid;
    var cid=req.query.cid;
    var count=req.query.count;
    if(!uid){
        res.send(JSON.stringify({code:-1,msg:"login required"}));
        return;
    };
    if(!cid){
        res.send(JSON.stringify({code:-1,msg:"cid required"}));
        return;
    };
    if(!count){
        res.send(JSON.stringify({code:-1,msg:'count required'}));
        return;
    }
    var sql="UPDATE hh_shopping_cart SET count=? WHERE cid=? AND uid=?";
    query(sql,[count,cid,uid])
    .then(result=>{
        if(result.affectedRows>0){
            res.send(JSON.stringify({code:1,msg:"修改成功"}))
        }else{
            res.send(JSON.stringify({code:-1,msg:"修改失败"}))
        }
    })
    .catch(error=>console.log(error))
});
/////5修改购物车条目中的是否勾选
router.get("/updatechecked",(req,res)=>{
    var uid=req.session.uid;
    var cid=req.query.cid;
    var is_checked=req.query.is_checked;
    if(!uid){
        res.send(JSON.stringify({code:-1,msg:"login required"}));
        return;
    };
    if(!cid){
        res.send(JSON.stringify({code:-1,msg:"cid required"}));
        return;
    };
    if(!is_checked){
        res.send(JSON.stringify({code:-1,msg:'is_checked required'}));
        return;
    };
    var sql="UPDATE hh_shopping_cart SET is_checked=? WHERE cid=? AND uid=?";
    query(sql,[is_checked,cid,uid])
    .then(result=>{
        if(result.affectedRows>0){
            res.send(JSON.stringify({code:1,msg:"修改成功"}))
        }else{
            res.send(JSON.stringify({code:-1,msg:"修改失败"}))
        }
    })
    .catch(error=>console.log(error))
});
/////全选
router.get("/updatecheckedall",(req,res)=>{
    var uid=req.session.uid;
    var is_checked=req.query.is_checked;
    if(!uid){
        res.send(JSON.stringify({code:-1,msg:"login required"}));
        return;
    };
    if(!is_checked){
        res.send(JSON.stringify({code:-1,msg:'is_checked required'}));
        return;
    };
    var sql="UPDATE hh_shopping_cart SET is_checked=? WHERE  uid=?";
    query(sql,[is_checked,uid])
    .then(result=>{
        if(result.affectedRows>0){
            res.send(JSON.stringify({code:1,msg:"修改成功"}))
        }else{
            res.send(JSON.stringify({code:-1,msg:"修改失败"}))
        }
    })
    .catch(error=>console.log(error))
});
/////清空订单
router.get("/delall",(req,res)=>{
    var uid=req.session.uid;
    if(!uid){
        res.send(JSON.stringify({code:-1,msg:"login required"}));
        return;
    };
    if(!is_checked){
        res.send(JSON.stringify({code:-1,msg:'is_checked required'}));
        return;
    };
    var sql="DELETE FROM hh_shopping_cart WHERE  uid=?";
    query(sql,[is_checked,uid])
    .then(result=>{
        if(result.affectedRows>0){
            res.send(JSON.stringify({code:1,msg:"修改成功"}))
        }else{
            res.send(JSON.stringify({code:-1,msg:"修改失败"}))
        }
    })
    .catch(error=>console.log(error))
});
/////删除被选中的
router.get('/delchecked',(req,res)=>{
    var uid=req.session.uid;
    var is_checked=req.query.is_checked;
    if(!uid){
        res.send(JSON.stringify({code:-1,msg:"login required"}));
        return;
    };
    if(!is_checked){
        res.send(JSON.stringify({code:-1,msg:"is_checked required"}));
        return;
    }
    var sql="DELETE FROM hh_shopping_cart WHERE is_checked=? AND  uid=?";
    query(sql,[is_checked,uid])
    .then(result=>{
        if(result.affectedRows>0){
            res.send(JSON.stringify({code:1,msg:"删除成功"}))
        }else{
            res.send(JSON.stringify({code:-1,msg:"删除失败"}))
        }
    })
    .catch(error=>console.log(error))
});
module.exports=router;