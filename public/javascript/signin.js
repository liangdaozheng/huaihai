//封装函数自调用
(function(){
  //加载完加载功能
  $(function(){
    //两个正则函数验证用户名和密码
    function checkUname(uname){
      var reg=/^[a-zA-Z]{3,15}$/; 
        if(reg.test(uname)==false){
          $("#puname").html("用户名不合规").css("color","#cc3341")
          return false;
          }
          $("#puname").html("用户名验证中···").css("color","#488aff")
          return true;
        };  
    /*密码验证*/    
    function checkPwd(upwd){
      var reg=/^[a-zA-Z0-9]{4,10}$/;    
        if(reg.test(upwd)==false){
           $("#pupwd").html("密码不合规,含有非法字符").css("color","#cc3341");
          return false;
          }
          $("#pupwd").html("请登录").css("color","#32db64");
          $("#losepassword").next().html("需要下次自动登录,请点击自动登录保存记录").show().css("color","#488aff").fadeOut(3300);
          return true;
        };
    //发送请求的是否有该名字
    var timsend="";
    function selectname(uname){
      timsend=setTimeout(function(){
        var url="selectuname";
        var data={uname};
        var params={
             type:"get",
             dataType:"json"
             };
       window.ajax({url,data,params})
       .then(result=>{
         //console.log(result);
         if(result.code==1){
           sessionStorage.removeItem("unameok");
           sessionStorage.setItem("unameok",true);
           $("#puname").html("欢迎回来,请登录！").css("color","#32db64");
         }else{
           $("#puname").html("未注册用户,请注册！").css("color","#cc3341");
         }
       })
      },3000)
    }
    ///
    //用户名姓名框
    //获取焦点
    $("#uname").focus(function(){
      $("#puname").html("请输入登录名").css("color","#000");
      sessionStorage.removeItem("unameok") 
      clearTimeout(timsend);
    });
    //失去焦点
    $("#uname").blur(function(){
    var uname=$(this).val();
    //console.log(uname);
    if(checkUname(uname)){
      //请求数据库查询 把查询结果暂时保存得sessionStorage中，先移除再保存
      selectname(uname);  
    }
    });
    //密码框
    $("#upwd").focus(function(){
      $("#pupwd").html("请输入登录密码").css("color","#000");
    });
    //失去焦点
    $("#upwd").blur(function(){
    var upwd=$(this).val();
    checkPwd(upwd)
    });
    /////////////
    //判断是否是要自动登录
    if(localStorage.getItem("auto")==1){$("#auto").prop("checked",true)};
    $("#auto").click(function(){
      var $auto=$(this);
      if(localStorage.getItem("auto")==="1"){
        localStorage.removeItem("auto");
        localStorage.setItem("auto","0");
        $auto.prop("checked",false) ;
        localStorage.removeItem("string");
        localStorage.removeItem("str");
      }else {
        localStorage.removeItem("auto");
        localStorage.setItem("auto","1");
        $auto.prop("checked",true);
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        if(sessionStorage.getItem("unameok")){
          if( checkPwd(upwd)){
            localStorage.removeItem("string");
            localStorage.removeItem("str");
            localStorage.setItem("string",uname);
            var str="hfkafje%"+"abcdefg#%"+"cnafjjijffj%"+upwd+"%"+"@1223 $^@"
            localStorage.setItem("str",str);
          }else{
            $("#pupwd").html("请检查密码").css("color","#488aff");
          }
        }else{
          $("#puname").html("请检查用户名").css("color","#488aff")
        }
      }  
    })
    ////忘记密码项
    $("#losepassword").click(function(){
      $(this).next().html("请用注册时的邮箱发邮件来验证").show().css("color","#cc3341").fadeOut(2500)
    })
    ////
    //登录
    var key=true;
    $("#user_login").click(function(){
      //console.log(111);
       if(localStorage.getItem("auto")==="1"){
        $("#uname").val(localStorage.getItem("string"));
        var str=localStorage.getItem("str");
        str=str.split("%")[3];
        //console.log(str);
        $("#upwd").val(str);
       };
      var uname=$("#uname").val();
      var upwd=$("#upwd").val();
      //console.log(uname,upwd);
      if(!uname){
        $("#puname").html("请检查用户名").css("color","#488aff");
        return;
      };
      if(!upwd){
        $("#pupwd").html("请检查密码").css("color","#488aff");
        return;
      };
      if(key){
        key=false;
      var url="signin";
      var data={uname,upwd};
      var params={
           type:"post",
           dataType:"json"
           };
     window.ajax({url,data,params})
     .then(result=>{
       //console.log(result);
       setTimeout(function(){key=true},1950);
       if(result.code===1){
        sessionStorage.removeItem("unameok");
        sessionStorage.removeItem("uid");
        sessionStorage.setItem("uid",result.data.uid);
        var index=2;
        var jumptim=setInterval(()=>{
          index--;
          var str="";
          if(index==1){str="一"};
          if(index<=0){str="〇"};
          $("#user_login").html(`${str}秒后跳转到首页`).css("color","#32db64")
         },1000);
        setTimeout(()=>{
          clearInterval(jumptim);
           location.replace("index.html"); 
       },2300) 
      }else{ 
        sessionStorage.removeItem("unameok");
        sessionStorage.removeItem("uid");
        if(localStorage.getItem("auto")==="1"){
          localStorage.removeItem("auto");
          localStorage.setItem("auto","0");
          localStorage.removeItem("string");
          localStorage.removeItem("str");
          $("#auto").prop("checked",false)
        }
        $("#user_login").html("登录失败 请重新登录").css("color","#fff");
        setTimeout(()=>{ $("#user_login").html("登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录").css("color","#ab2121f0")},3500)
       }       
     })
    } 
    })

  })//load 的结尾
})()//函数自调的结尾