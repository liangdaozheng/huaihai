//封装在自调用函数中
(function(){
  //页面加载完取值
  $(function(){
 //封装检验函数
/*用户名验证*/    
function checkUname(uname){
  var reg=/^[a-zA-Z]{3,15}$/; 
    if(reg.test(uname)==false){
      $("#uname_p").html("用户名不合规").css("color","#cc3341")
      return false;
      }
      $("#uname_p").html("用户名验证中···").css("color","#488aff")
      return true;
    }  
/*密码验证*/    
function checkPwd(upwd){
  var reg=/^[a-zA-Z0-9]{4,10}$/;    
    if(reg.test(upwd)==false){
       $("#upwd_p").html("密码不合规,含有非法字符").css("color","#cc3341");
      return false;
      }
      $("#upwd_p").html("密码通过").css("color","#32db64");
      return true;
    }
    
function checkRepwd(upwd,reupwd){
    if(upwd!==reupwd){
       $("#ok_upwd_p").html("两次输入的密码不一致").css("color","#cc3341");
      return false;
      }
      $("#ok_upwd_p").html("两次密码一致").css("color","#32db64");
      return true;
    }

/*验证邮箱*/
function checkEmail(email){
  var reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;    
    if(reg.test(email)==false){
      $("#email_p").html("Email格式不正确，例如web@sohu.com").css("color","#cc3341");
      return false;
      }
      $("#email_p").html("Email格式正确").css("color","#32db64");
      return true;
}
/*验证手机号码*/
function checkMobile(phone){
    var regMobile=/^1\d{10}$/;
    if(regMobile.test(phone)==false){
        $("#phone_p").html("手机号码不正确，请重新输入").css("color","#cc3341");
        return false;
        }
        $("#phone_p").html("手机号码格式正确").css("color","#32db64");
        return true;
    }
//////
  ////封装两个函数验证用户名的函数
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
          $("#uname_p").html(result.msg).css("color","#cc3341");
         }else{
           sessionStorage.removeItem("unameok");
           sessionStorage.setItem("unameok",true);
           $("#uname_p").html(result.msg).css("color","#32db64");
         }
       })
      },3000)
    }
 //注册用户名姓名框
  //获取焦点
  $("#uname").focus(function(){
    $("#uname_p").html("请输入3~15位字母").css("color","#000");
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
    $("#upwd_p").html("请输入4~10位字母、数字").css("color","#000");
  });
  //失去焦点
  $("#upwd").blur(function(){
   var upwd=$(this).val();
   checkPwd(upwd)
  });
  //密码确认框
  $("#ok_upwd").focus(function(){
    $("#ok_upwd_p").html("请再次确认密码").css("color","#000");
  });
  //失去焦点
  $("#ok_upwd").blur(function(){
    var upwd=$("#upwd").val();
   var reupwd=$(this).val();
   //console.log(upwd,reupwd);
   checkRepwd(upwd,reupwd)
  });
  //邮箱
  $("#email").focus(function(){
    $("#email_p").html("请输入合法的邮箱").css("color","#000");
  });
  //失去焦点
  $("#email").blur(function(){
   var email=$(this).val();
   checkEmail(email)
  });
  //电话
  $("#phone").focus(function(){
    $("#phone_p").html("请输入3~15位字母").css("color","#000");
  });
  //失去焦点
  $("#phone").blur(function(){
   var phone=$(this).val();
   checkMobile(phone)
  });
  //////完成注册功能，设置防一致按的情况
  var key=true;
  $("#user_reg").click(function(){
    //检验以上数据是否为true，才可请求注册post
    var uname=$("#uname").val();
   var upwd=$("#upwd").val();
   var reupwd=$("#ok_upwd").val();
   var email=$("#email").val();
   var phone=$("#phone").val();
   //console.log(uname,upwd,reupwd,email,phone);
   //判断注册资料
    if(sessionStorage.getItem("unameok")){
      if(checkPwd(upwd)){
        if(checkRepwd(upwd,reupwd)){
          if(checkEmail(email)){
            if(checkMobile(phone)){
              //设置防一致按的情况
              //console.log(key)
              if(key){
                key=false;
                //console.log(uname);
                var url="register";
                  var data={uname,upwd,email,phone};
                  var params={
                       type:"post",
                       dataType:"json"
                       };
                 window.ajax({url,data,params})
                 .then(result=>{
                   setTimeout(function(){key=true},3400);
                   //console.log(result);
                   if(result.code===1){
                     sessionStorage.removeItem("unameok");
                     var index=3;
                     var jumptim=setInterval(()=>{
                       index--;
                       var str="";
                       if(index==2){str="二"};
                       if(index==1){str="一"};
                       if(index<=0){str="〇"};
                       $("#user_reg").html(`${str}秒后跳转到登录`).css("color","#32db64")
                      },1000);
                     setTimeout(()=>{
                       clearInterval(jumptim);
                        location.replace("login.html"); 
                    },3500) 
                   }else{
                    sessionStorage.removeItem("unameok");
                    $("#user_reg").html("注册失败 请重新注册").css("color","#fff")
                    setTimeout(()=>{ $("#user_reg").html("立即注册").css("color","#ab2121f0")},3500)
                   }
                 })
              }

            }else{
              $("#phone_p").html("请检查手机号码格式").css("color","#488aff");
            }
          }else{
            $("#email_p").html("请检查Email格式").css("color","#488aff");
          }
        }else{
          $("#ok_upwd_p").html("请保持两次密码的一致").css("color","#488aff");
        }
      }else{
        $("#upwd_p").html("请检查密码").css("color","#488aff");
      }
    }else{
      $("#uname_p").html("请检查用户名").css("color","#488aff")
    }       
  })
  
})
})()//自调用函数结尾