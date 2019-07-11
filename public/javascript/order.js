//////订单页面，我的信息，修改密码
(function(){
  ////获取访问页面的kw 
///商城订单 | orderpageorder   orderbtn
//个人中心 |  orderpageupwd    upwdbtn
//我的收藏 地址 | orderpageaddress   addressbtn
//我的信息 /////添加地址块 不用了  orderpagemainself   selfbtn
  ///加载函数load
  $(function(){
    var kw=location.search.split("=")[1];
    kw=decodeURI(kw)
    //console.log(kw);
    ////
    var $order=$("#orderpageorder");
    var $upwd=$("#orderpageupwd");
    var $address=$("#orderpageaddress");
    var $self=$("#orderpagemainself");
    /////四个不同页面的函数
    ///商城订单加载函数
    function orderpagedata(){
      var url="cart/list";
      var data={};
      var params={
          type:"get",
          dataType:"json"
          };
      window.ajax({url,data,params})
      .then(result=>{
        //console.log(result);
        var num=result.data.cart.length;
        sessionStorage.removeItem("cartcount");
        sessionStorage.setItem("cartcount",num);
        //console.log(num);
        var {cart,pics,wins}=result.data;
        if(result.data.cart.length>0){
          //结算按钮呈现
          $("#orderallbtnpay").css("display","none");
        //重组数据 冒泡函数
        function sortwines(cpp,wines){
          for(var i=0;i<(wines.length-1);i++){
            for(var j=0;j<(wines.length-i-1);j++){
              if(wines[j][cpp]<wines[j+1][cpp]){
                var temp=wines[j];
                wines[j]=wines[j+1];
                wines[j+1]=temp;
              }
            }
          }
          return wines
        };
        //图片去重
        var cart=sortwines("wid",cart);
        var pics=sortwines("wid",pics);
        var wins=sortwines("wid",wins);
        //console.log(cart);
        //console.log(pics);
        //console.log(wins);
        var more=[];
        for(var i=0;i<pics.length-1;i++){
          if(pics[i].wid!=pics[i+1].wid){
            //console.log(arr[i].wid);
            more.push(pics[i].sm);
          }
        };
        more.push(pics[pics.length-1].sm);
        //console.log(more);
        ///添加需要的数据
        for(var j=0;j<wins.length;j++){
             wins[j].sm=more[j];
             wins[j].cid=cart[j].cid;
             wins[j].count=cart[j].count;
             wins[j].is_checked=cart[j].is_checked;
        };
        //console.log(wins);
        ///记载数据到页面
        var allsumpay=0;
        var html=``;
        for(var tmp of wins){
          if(tmp.is_checked==1){
            //console.log(tmp);
            html+=`
            <div class="pro_order_card" >
            <div class="order_card_main clearboth">
              <!-- 选择框 -->
              <div class="radiobox cell" style="visibility: hidden;">
                <div class="radio">
                  <input class="boxed" type="checkbox">
                  <label for="" class="checkedlab" style="display: none">勾选商品</label>
                  <span class="lear_span"></span>
                </div>
              </div>
              <!-- 图片 名字区 -->
              <div class="picname_box cell">
                <div class="picname clearboth">
                  <div class="pic"><a href="javascript:;"><img src="${tmp.sm}" alt=""></a></div>
                  <div class="name"><a href="javascript:;">
                      ${tmp.pname}</a><span data-pay="status">等待付款</span></div>
                </div>
              </div>
              <!-- 价格区 -->
              <div class="pricebox cell">
                <p class="price"><strong>${(tmp.price).toFixed(2)}</strong></p>
              </div>
              <!-- 数量块 -->
              <div class="countbox cell" style="visibility: hidden;">
                <div class="count clearboth">
                  <a href="javascript:;" class="smah">-</a>
                  <input type="text" value="1" class="itext">
                  <a href="javascript:;" class="bigh">+</a>
                </div>
              </div>
              <!-- 小合集 -->
              <div class="salcsumbox cell">
                <strong>${((tmp.price.toFixed(2))*tmp.count).toFixed(2)}</strong>
              </div>
              <!-- 移除块 -->
              <div class="deletecartbox cell" style="visibility: hidden;">
                <a href="javascript:;">删除</a>
              </div>
            </div>
        </div>
            `;
            ////合计金额
            var sumpay=parseFloat(((tmp.price.toFixed(2))*tmp.count).toFixed(2))
            allsumpay+=sumpay;
          };
        };
        //console.log(allsumpay);
        var n=0;
        for(var tp of wins){
          if(tp.is_checked==1){
            n++;
          }
        };
        if(n=0){
          $("#orderallbtnpay").css("display","none");
          $("#orderlistmain").css("display","none");
        }else{
          $("#orderallbtnpay").css("display","block");
          $("#orderlistmain").css("display","block");
          $("#allpaymon").html("￥"+allsumpay.toFixed(2));
          $("#orderlistmain").html(html);
        }
        ///orderlistmain 订单主体架构
        
      }else{
        //没有数据无空
        $("#orderallbtnpay").css("display","none");
        $("#orderlistmain").css("display","none");
      };
      ///付款
      $("#orderpaybtn").click(function(){
        var btn=$(this);
        btn.css("display","none");
        var paystatus=$("[data-pay='status']");
        //console.log(paystatus);
        setTimeout(function(){
          $("#orderpayallcount").show()
        },2000);
        setTimeout(function(){
          for(var i=0;i<paystatus.length;i++){
            $(paystatus[i]).html("等待发货");
          };
        },3000);
        setTimeout(function(){
          for(var i=0;i<paystatus.length;i++){
            $(paystatus[i]).html("已发货");
          };
          $("#orderallbtnpay").css("display","none");
        },6000);
        setTimeout(function(){location.replace("index.html");},7000);
      })
      })//数据加载回来
    };
    ///个人中心加载函数
    function upwdbtnpage(){
      console.log("个人中心");
      var url="selectuname/phone";
      var data={};
      var params={
          type:"get",
          dataType:"json"
          };
      window.ajax({url,data,params})
      .then(result=>{
        console.log(result);
        if(result.code==1){
          var phone=result.data[0].phone;
          console.log(phone);
          $("#usephone").html(phone);
        }else{
          $("#usephone").html("输入本人验证手机号");
        }
      });
      ///单击发送验证码
      var keydown=true;
      $("#regphonebtn").click(function(){
        var btn=$(this);
        if(keydown){
          keydown=false;
        btn.html("已发送");
        var ss=60;
        var times=setInterval(function(){
          ss--;
          btn.html(`${ss} s`)
        },1000);
        setTimeout(function(){
          clearInterval(times);
          btn.html("获取短信验证码");
          keydown=true;
        },61000)
      }
      });
      ///密码验证函数
      /*密码验证*/    
        function checkPwd(upwd){
          var reg=/^[a-zA-Z0-9]{4,10}$/;    
            if(reg.test(upwd)==false){
              $("#toastpw").html("密码不合规：");
              setTimeout(function(){$("#toastpw").html("新的登录密码：");},2000)
              return false;
              }
              return true;
            }       
        function checkRepwd(upwd,reupwd){
            if(upwd!==reupwd){
              $("#alertpw").html("两次密码不一致");
              setTimeout(function(){$("#alertpw").html("请再输入一次密码：");},2000)
              return false;
              }
              return true;
            };
       //密码框   
          //失去焦点
          $("#passwordorder").blur(function(){
          var upwd=$(this).val();
          checkPwd(upwd)
          });
          //密码确认框        
          //失去焦点
          $("#passwordok").blur(function(){
            var upwd=$("#passwordorder").val();
          var reupwd=$(this).val();
          //console.log(upwd,reupwd);
          checkRepwd(upwd,reupwd)
          });
          var keypw=true; 
      $("#passwordbtn").click(function(){
        if(keypw){
        var upwd=$("#passwordorder").val();
        var reupwd=$("#passwordok").val();
        if(checkPwd(upwd)){
          if(checkRepwd(upwd,reupwd)){
            var url="user/updatepw";
            var data={upwd};
            var params={
                type:"post",
                dataType:"json"
                };
            window.ajax({url,data,params})
            .then(result=>{
              //console.log(result);
              if(result.code==1){
                $("#menutwo").addClass("on").siblings().removeClass("on");
                $("#updatepw").hide();
                $("#updatesucc").show();
                sessionStorage.clear();
                localStorage.clear();
                setTimeout(function(){location.replace("login.html")},3000)
              }else{
                $("#passwordbtn").html("修改失败");
                setTimeout(function(){ keypw=true;$("#passwordbtn").html("提交");},2000)
              }
            })
          }
         }
        }
      });
    };///个人中心还是结尾
    ///我的收藏加载函数
    function addresspagedata(){
      $("#addressadd").click(function(){
        $(this).next().html("系统升级中,敬请期待···");
        setTimeout(function(){$(this).next().html("你已创建 <span>1</span>	个收货地址，最多可创建 <span>20</span> 个");},3000)
      });
      $("#updateaddress").click(function(){
        $("#orderpayallcount").fadeIn().fadeOut(3000);
      })
    }
    ///我的信息加载函数
    function selfdatapage(){
      var url="user/huaihai";
      var data={};
      var params={
          type:"get",
          dataType:"json"
          };
      window.ajax({url,data,params})
      .then(result=>{
        //console.log(result);
        var data=result.data[0];
        //console.log(data);
        $("#orderusername").html(data.uname);
        if(data.avatar!==null){
          $("#showuseravatar").css("background-image",`url(http://127.0.0.1:8080/${data.avatar})`)
        };
        //上传头像功能
        $("#showuseravatar").click(function(){
          $("#file").click()
        });
        //为文件框绑定
        $("#file").on("change",function(event){
          var formData= new FormData();
          //console.log($(event.target));
          formData.append('file',$(event.target)[0].files[0]);
          //formData.append("file",$(event.target)[0].files[0]);
          //console.log($(event.target)[0].files[0]);
          $.ajax({
            url:"http://127.0.0.1:8080/avatar",
            type:"post",
            cache:false,
            data:formData,
            processData:false,
            contentType:false,
            xhrFields:{withCredentials:true},
            crossDomain:true,				
            success:function(res){
              //console.log(res)
              src="http://127.0.0.1:8080/"+res;
              $("#showuseravatar").css("background-image",`url(${src})`);
            }
          })
        });
        var html=`
        <div class="mainself_nav_box">
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>会员名称</span>
          </div>
          <div class="col_value">
            <span class="phone">${data.uname}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>真实姓名:</span>
          </div>
          <div class="col_value">
            <span class="name">${data.use_name==null?"":data.use_name}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>性别:</span>
          </div>
          <div class="col_value">
            <span class="gender">${data.gender==null?"保密":data.gender}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>生日:</span>
          </div>
          <div class="col_value">
            <span class="birthday">${data.birthday==null?"":data.birthday.toLocaleString()}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>居住地:</span>
          </div>
          <div class="col_value">
            <span class="add">${''}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>联系地址:</span>
          </div>
          <div class="col_value">
            <span class="citys">${''}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>邮编:</span>
          </div>
          <div class="col_value">
            <span class="postcode">${''}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key">
            <strong></strong>
            <span>注册邮箱:</span>
          </div>
          <div class="col_value">
            <span class="email">${data.email}</span>
          </div>
        </div>
        <div class="rows">
          <div class="col_key"></div>
          <div class="col_value">
            <input type="submit" value="修改资料" class="mailself_btnup" id="updatemsgbtn">
          </div>
        </div>
      </div>
        `;
        $("#mainselfshow").html(html);
        ///修改信息按钮
        $("#updatemsgbtn").click(function(){
          $("#mainselfshow").css("display","none");
          $("#mainselfupdate").css("display","block");
        });
        //保存信息页面
        $("#savemsgbtn").click(function(){
          $("#mainselfshow").css("display","block");
          $("#mainselfupdate").css("display","none");   
        })
      });
    }
    
    ///加载的数据判断选项
    if(kw=="商城订单"){
      //console.log("商城订单");
      $order.css("display","block");
      $upwd.css("display","none");
      $address.css("display","none");
      $self.css("display","none");
      $("#orderbtn").addClass("active").siblings().removeClass("active");
      orderpagedata()
    }else if(kw=="个人中心"){
      //console.log('个人中心')
      $order.css("display","none");
      $upwd.css("display","block");
      $address.css("display","none");
      $self.css("display","none");
      $("#upwdbtn").addClass("active").siblings().removeClass("active");
      upwdbtnpage()
    }else if(kw=="我的收藏"){
      //console.log('我的收藏')
      $order.css("display","none");
      $upwd.css("display","none");
      $address.css("display","block");
      $self.css("display","none");
      $("#addressbtn").addClass("active").siblings().removeClass("active");
      addresspagedata()
    }else if(kw=="我的信息"){
      //console.log('我的信息')
      $order.css("display","none");
      $upwd.css("display","none");
      $address.css("display","none");
      $self.css("display","block");
      $("#selfbtn").addClass("active").siblings().removeClass("active");
      selfdatapage()
    }else{
      location.href="index.html";
    };
    ////旁边订单选项的按钮颜色
    $("#orderlistdds").on("click","dd",function(){
      //console.log(this);
      var dd=$(this);
      dd.addClass("active").siblings().removeClass("active");
      var kw=dd.text();
      //console.log(kw);
      if(kw=="商城订单"){ 
        $order.css("display","block");
        $upwd.css("display","none");
        $address.css("display","none");
        $self.css("display","none");
        orderpagedata()
      }else if(kw=="账户安全"){
        $order.css("display","none");
        $upwd.css("display","block");
        $address.css("display","none");
        $self.css("display","none");
        upwdbtnpage()
      }else if(kw=="我的收藏"){
        //console.log('我的收藏')
        $order.css("display","none");
        $upwd.css("display","none");
        $address.css("display","block");
        $self.css("display","none");
        addresspagedata()
      }else if(kw=="个人信息"){
        //console.log('个人信息')
        $order.css("display","none");
        $upwd.css("display","none");
        $address.css("display","none");
        $self.css("display","block");
        selfdatapage()
      }else{
        return;
      };
    });
  })///load加载函数结尾
})()//自调函数的结尾