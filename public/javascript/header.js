//头部公共部分
(function(){
  $(function(){
    $.ajax({
      url:"header.html",
      type:"get",
      success(html){
      $(html).replaceAll("#header");
      $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo("head");
      ////头部功能区
      if(sessionStorage.uid!=undefined){
        $("#loginpage").html(`
        <a >欢迎光临</a>
        <span>|</span>
        `);
        $("#registerpage").html(`
        <a id="signout">退出登录</a>
        <span>|</span>
        `);
      }else{
        $("#loginpage").html(`
          <a href="login.html">请登录</a>
          <span>|</span>
        `);
        $("#registerpage").html(`
        <a href="reg.html">免费注册</a>
				<span>|</span>
        `);
      };
      ///退出登录
      $("#signout").click(function(){
        sessionStorage.removeItem("cartcount");
        sessionStorage.removeItem("uid");
        var url="signout";
            var data={};
            var params={
                type:"get",
                dataType:"json"
                };
        window.ajax({url,data,params})
        .then(result=>{
          console.log(result);
          if(result.code==1){
            location.replace("index.html");
          }else{
            close();
          }
        })
      })
      ////用户信息四个跳转页面
      $("li[data-use='msg']").click(function(){
        var str=$(this).children().first().text();
        var $lia=$(this).children().first();
        console.log($lia);
        //href="order.html" target="_blank"
        if(sessionStorage.uid!=undefined){
          location.href="order.html?kw="+str;
        }else{
          $lia.html("请去登录");
          setTimeout(function(){$lia.html(str);},1000);
        }
      });
      ///搜搜框
      $("#headsearch").click(function(){
        var $inp=$("#headinput");
        var kw=$inp.val();
        console.log(kw);
        var url="search";
        var data={kw};
        var params={
            type:"get",
            dataType:"json"
            };
        window.ajax({url,data,params})
        .then(result=>{
             var fids=result.data.fids;
             console.log(fids);
             if(fids.length>0){
               var fid=fids[0].fid;
               console.log(fid);
               location.href="product_list.html?fid="+fid;
             }else{
                  console.log($inp);
                  $inp.val('');
                  $inp.prop("placeholder","请输入关键字,如:习酒");
             }
        })
      })

      }///加载页面成功结尾
    })
  })
})()