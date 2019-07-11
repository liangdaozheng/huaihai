//所有内容放在一个函数自调用中，全局变量的污染
(function(){
     //顶部搜索框的滚动操作
     $(window).scroll(function(){
     //通过scrollTop获取到滚动条滚动的高度，判断条件高度>=182
     if($(window).scrollTop()>=182){
       //修改#top的显隐性
          $("#index_search_row").css("display","block")
     }else(
       //修改#top的显隐性
          $("#index_search_row").css("display","none")
     );
     });
     $("#cartcountindexhead").html(sessionStorage.cartcount);
     ////固定搜索框
     $("#searchbtn").click(function(){
          var $inp=$("#searchinput");
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

      //右侧购物车区域的显隐
      var $cart=$("#cart_visib_left");
      var $msg=$("#index_right_column");
      $cart.click(function(){
          var rth=parseInt($msg.css("right"));
          if(rth<0){$msg.css("right",0)}else{$msg.css("right",-325)};
          ////加载数据购物车数据
          $("#indexorder").css("display","none");
          $("#indexorderbtn").css("display","none");
          if(sessionStorage.uid!=undefined){
             //数据库加载数据
             $("#cartgif").css("display","block");
             ////先请求购物车列表
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
               //console.log(cart,pics,wins);
               if(result.data.cart.length>0){
                    //结算按钮呈现
                    $("#indexorderbtn").css("display","block");
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
                  console.log(wins);
                  ///往页面记载数据
                  $("#indexorderdetail").css("display","block");
                  $("#cartgif").css("display","none");
                  $("#indexorder").css("display","block");
                  $("#indexnoorder").css("display","none");
                  var html=``;
                  for(var tmp of wins){
                       html+=`
                       <div class="pro_order_card" >
                       <div class="order_card_main clearboth">
                            <!-- 选择框 -->
                            <div class="radiobox cell">
                                 <div class="radio">
                                      <input class="boxed" type="checkbox" data-cid="${tmp.cid}"  data-checked="change">
                                      <label for="" class="checkedlab" style="display: none">勾选商品</label>
                                      <span class="lear_span"></span>
                                 </div>
                            </div>
                            <!-- 图片 名字区 -->
                            <div class="picname_box cell">
                                 <div class="picname clearboth">
                                      <div class="pic"><a href="product_detail.html?wid=${tmp.wid}"><img src="${tmp.sm}" alt=""></a></div>
                                      <div class="name"><a href="javascript:;"></a></div>
                                 </div>
                            </div>
                            <!-- 价格区 -->
                            <div class="pricebox cell">
                                 <p class="price"><strong>${tmp.price.toFixed(2)}</strong></p>
                            </div>
                            <!-- 数量块 -->
                            <div class="countbox cell">
                                 <div class="count clearboth">
                                      <a href="javascript:;" class="smah" date-count="btn">-</a>
                                      <input type="text" value="${tmp.count}" class="itext" data-cid="${tmp.cid}" data-input="count">
                                      <a href="javascript:;" class="bigh" date-count="btn">+</a>
                                 </div>
                            </div>
                            <!-- 小合集 -->
                            <div class="salcsumbox cell">
                                 <strong data-sma="sum">${((tmp.price.toFixed(2))*tmp.count).toFixed(2)}</strong>
                            </div>
                            <!-- 移除块 -->
                            <div class="deletecartbox cell">
                                 <a href="javascript:;" data-cid="${tmp.cid}" data-del="btn">删除</a>
                            </div>
                       </div>
                  </div>
                       `;
                  }
                  $("#cartcard").html(html);
                  ////处理函数加载去
                  ////单选商品发送
                  var inputs=$("input[data-checked='change']");
                  var allsum=0;
                  var checknum=0;
                  //console.log(inputs);
                  for(var i=0;i<inputs.length;i++){
                    if(wins[i].is_checked==1){
                         inputs[i].checked=true;
                         checknum++;
                         allsum+=wins[i].count*wins[i].price
                    };
                    if(wins[i].is_checked!=1){
                      $("#checkedall")[0].checked=false;
                    }else{
                      $("#checkedall")[0].checked=true;
                    }
                  };
                  ////初始化合计的钱数
                  $("#allsum").html(allsum.toFixed(2));
                  $("#checknum").html(checknum);
                  ///全选按钮事件
                  $("#checkedall").click(function(){
                    var ckba=$(this);
                    //console.log(ckba);
                    var check=ckba.prop("checked");
                    //console.log(check);
                    var is_checked=1;
                    var allsum=0;
                    var checknum=0; 
                    if(check==true){
                     for(var i=0;i<inputs.length;i++){   
                         inputs[i].checked=true;
                         checknum++;                       
                     };
                      ////全选按钮的金额 获取所有的小计
                      var allsmsum=$("[data-sma='sum']");
                      //console.log(allsmsum);
                      var allsmsumcount=0;
                      for(var i=0;i<allsmsum.length;i++){
                         //console.log(allsmsum[i]);
                           var mon=allsmsum[i].innerText;
                           mon=parseFloat(mon);
                           //console.log(mon);
                           allsmsumcount+=mon;
                      }
                     is_checked=1;
                     $("#allsum").html(allsmsumcount.toFixed(2));
                     $("#checknum").html(checknum);   
                    }else{
                     for(var i=0;i<inputs.length;i++){   
                         inputs[i].checked=false;
                     };
                     is_checked=0;
                     $("#allsum").html(allsum.toFixed(2));
                     $("#checknum").html(checknum);     
                    };
                    ////修改数据
                    var url="cart/updatecheckedall";
                       var data={is_checked};
                       var params={
                           type:"get",
                           dataType:"json"
                           };
                    window.ajax({url,data,params})
                    .then(result=>{
                         //console.log(result);
                    })
                  });
                  /////一个选择项改变时
                  $("input[data-checked='change']").click(function(){
                       //console.log($(this));
                       var ckb=$(this);
                       var cid=ckb[0].dataset.cid;
                       console.log(ckb);
                       var check=ckb.prop("checked");
                       //console.log($check);
                       var checkonenum=$("#checknum").text();
                       var checkonesum=parseFloat($("#allsum").text());
                       //console.log(checkonenum,checkonesum);
                       ///当前元素的小计
                       var smsum=ckb.parent().parent().parent().children().eq(4).children().first().text();
                       smsum=parseFloat(smsum);
                       //console.log(smsum);
                       var is_checked=0;
                       if(check==true){
                         is_checked=1;
                         checkonenum++;
                         checkonesum+=smsum;
                       }else{
                         is_checked=0
                         checkonenum--;
                         checkonesum-=smsum;
                         ///修改全选按钮
                         $("#checkedall").prop("checked",false);
                       };
                       /////把值放回去
                       //console.log(checkonesum);
                       $("#allsum").html(checkonesum.toFixed(2));
                       $("#checknum").html(checkonenum);     
                       ///发送求情
                       var url="cart/updatechecked";
                       var data={cid,is_checked};
                       var params={
                           type:"get",
                           dataType:"json"
                           };
                       window.ajax({url,data,params})
                    //    .then(result=>{
                    //         //console.log(result);
                    //    })
                  });
                  ///数量按钮添加事件
                  $("[date-count='btn']").click(function(){
                       var btn=$(this);
                       //console.log(btn.text());
                       ///数量
                       var countinp=btn.parent().children().eq(1);
                       //console.log(countinp);
                       var count=countinp.val();
                       count=Math.floor(count);
                       //console.log(count);
                       if(btn.text()=="-"){
                         if(count==1){
                              return;
                         }else{
                              count--;
                         }
                       }else if(btn.text()=="+"){
                            count++;
                       };
                       countinp.val(count);
                       countinp.change();
                  })
                  /////数量框添加监听事件
                  $("input[data-input='count']").change(function(){
                       var countinp=$(this);
                       //console.log(countinp);
                       ////获取数量值
                       var count=Math.floor(countinp.val())
                         console.log(count);
                       var cardmin=countinp.parent().parent().parent().children();
                       console.log(cardmin);
                       ////小计
                       var smstrong=cardmin.eq(4).children().first();
                       var smsum=parseFloat(smstrong.text());
                       console.log(smsum);
                       ///价格
                       var price=parseFloat(cardmin.eq(2).text());
                       console.log(price);
                       ////获取提交的按钮系列值
                       ////商品数量合计元素
                       var allsum= $("#allsum");
                       //var checknum= $("#checknum");
                       var allsumcount=parseFloat(allsum.html());
                       console.log(allsumcount);
                       /////获取是否被选中
                       var checkbox=cardmin.first().children().first().children().first();
                       console.log(checkbox);
                       var ischecked=checkbox.prop("checked");
                       console.log(ischecked);
                       if(ischecked==false){
                         smsum=price*count;
                         smstrong.html(smsum.toFixed(2));
                       }else{
                         var newsmsum=price*count;
                         smstrong.html(newsmsum.toFixed(2));
                         ////修改总计
                         var mon=allsumcount- smsum;
                         mon+=  price*count;
                         allsum.html(mon.toFixed(2))
                       };
                       ////发送修改求情 updatecount
                       var cid=countinp[0].dataset.cid;
                       console.log(cid);
                       var url="cart/updatecount";
                       var data={cid,count};
                       var params={
                           type:"get",
                           dataType:"json"
                           };
                       window.ajax({url,data,params})
                       .then(result=>{
                            console.log(result);
                       })
                  });
                  ////删除按钮
                  $("[data-del='btn']").click(function(){
                       var delbtn=$(this);
                       var cid=delbtn[0].dataset.cid;
                       console.log(cid);
                       ////当前元素删除
                       var card=delbtn.parent().parent().parent();
                       console.log(card);
                       //card.css("display","none");
                       ////发送请求删除
                       var url="cart/del";
                       var data={cid};
                       var params={
                           type:"get",
                           dataType:"json"
                           };
                       window.ajax({url,data,params})
                       .then(result=>{
                            console.log(result);
                            if(result.code==1){
                              card.css("display","none");  
                            }else{
                              delbtn.html("失败");
                              setTimeout(function(){delbtn.html("删除");},2000)
                            }
                       })
                  })
               }else{
                 $("#indexorder").css("display","block");
                 $("#cartgif").css("display","none");
                 $("#indexorderdetail").css("display","none");     
               }
            })
            ///未登录的状态
          }else{
             $("#indexorder").css("display","block");
             $("#cartgif").css("display","none");
             $("#indexorderdetail").css("display","none");
          }
      });
      /////去结算
      $("#gotocartpay").click(function(){
           location.replace("order.html?kw=商城订单");
      })
      //关闭的购物车
      $("#close_cart").click(function(){
          $msg.css("right",-325);
      });
      //数据库 数据加载
      $(function(){
           $.ajax({
                url:"http://127.0.0.1:8080/index",
                type:"get",
                dataType:"json",
                xhrFields:{withCredentials:true},
                crossDomain:true,
                success(result){
                     //获取数据
                    var {carousel,products}=result;
                   //大的轮播图加载
                   //console.log(carousel)
                   var html=`
                   <ul>
                    <li><a href="${carousel[0].href}"><img src="${carousel[0].img}" alt=""></a></li>
                    <li><a href="${carousel[1].href}"><img src="${carousel[1].img}" alt=""></a></li>
                    <li><a href="${carousel[2].href}"><img src="${carousel[2].img}" alt=""></a></li>
                   </ul>`;
                   $("#carousel_boxs>.pic_box").html(html);
                    //轮播图功能区
                    var timer=null;
                    //显隐处理函数
                    var index=0;
                    var $carousel=$("#carousel_boxs");
                    var $li_pics=$("#carousel_boxs>.pic_box>ul").children();
                    var $shows=$("#carousel_boxs>.pic_show").children();
                    function autoPlay(){
                         if(index<=2){
                         $li_pics.eq(index).css("display","block").siblings().css("display","none");
                         $shows.eq(index).addClass("on").siblings().removeClass("on");
                         if(index<2){index++}else{index=0};
                         //console.log(index)
                         }; 
                    };
                    //轮播定时器
                    function timerPlay(){
                         timer=setInterval(function(){
                              autoPlay();
                         },2000)
                    };
                    timerPlay();
                    //鼠标一出一如事件
                    $carousel.hover(
                         function () {
                              clearInterval(timer);
                              },
                         function () {
                              timerPlay();    
                         }
                    );
                    //单击指示符事件
                    $shows.click(function(e){
                         var $show=$(e.target);
                         var i=$show.index();
                         index = i
                         autoPlay();                               
                    });  
                    //轮播图下的小图片
                    var html=`<div>
                    <a href="${products[39].href}">
                         <img src="${products[39].pic}" alt/>
                    </a>
                    </div>`;
                    $("#super_dog_pic").html(html);
                    //三张特价商品
                    var html=`<a href="${products[40].href}"><img src="${products[40].pic}" alt></a><a href="${products[41].href}"><img src="${products[41].pic}" alt></a><a href="${products[42].href}"><img src="${products[42].pic}" alt></a>`;
                    $("#new_self_three").html(html);
                    //小轮播图 循环加switch
                    var html=`<ul>
                         <li>
                              <a href="${carousel[3].href}"><img src="${carousel[3].img}" alt></a>
                              <p>习酒</p>
                         </li>
                         <li>
                              <a href="${carousel[4].href}"><img src="${carousel[4].img}" alt></a>
                              <p>茅台醇</p>
                         </li>
                         <li>
                              <a href="${carousel[5].href}"><img src="${carousel[5].img}" alt></a>
                              <p>贵州茅台酒</p>
                         </li>
                         <li>
                              <a href="${carousel[6].href}"><img src="${carousel[6].img}" alt></a>
                              <p>茅台葡萄酒</p>
                         </li>
                         <li>
                              <a href="${carousel[7].href}"><img src="${carousel[7].img}" alt></a>
                              <p>悠蜜</p>
                         </li>
                         <li>
                              <a href="${carousel[8].href}"><img src="${carousel[8].img}" alt></a>
                              <p>赖茅馆</p>
                         </li>
                         <li>
                              <a href="${carousel[9].href}"><img src="${carousel[9].img}" alt></a>
                              <p>黔茅</p>
                         </li>
                         <li>
                              <a href="${carousel[10].href}"><img src="${carousel[10].img}" alt></a>
                              <p>保健酒</p>
                         </li>
                         <li>
                              <a href="${carousel[11].href}"><img src="${carousel[11].img}" alt></a>
                              <p>白金酒</p>
                         </li>
                    </ul>`;
               $("#small_carousel_box").html(html);
               //小轮播图的功能
               var $btnLeft=$("#btn_left");
               var $btnRight=$("#btn_right");
               var $ul=$("#small_carousel_box>ul"); 
               var moved=0;            
               $btnRight.click(function(){  
                    moved++;
                    var newleft=-129*moved;
                    if(moved<=3){$ul.css("left",newleft);}else{moved=3};        
               });
               $btnLeft.click(function(){
                    moved--;
                    var newleft=-129*moved;
                    if(moved>=0){$ul.css("left",newleft);}else{moved=0};
               });          
               //商品区域
               console.log(products);
               //特惠区 可以用循环 只可惜数据太乱了
               var product=products.slice(0,10);
               var html="";
               for(var p of product){
                html+=`
                    <li>
                         <a href="${p.href}">
                              <div class="img">
                                   <img src="${p.pic}" alt="">
                              </div>
                              <div class="text">
                                   <p>${p.title}</p>
                                   <span>${p.price.toFixed(2)}</span>
                              </div>
                         </a>
                    </li>`
               };
               $("#list_tehui_data").html(html);
               //贵州茅台酒区域
               $("#maotai_main_left").html(`<a href="${products[43].href}"><img src="${products[43].pic}" alt=""></a>`)
               var html="";
               var product=products.slice(4,11);
               //console.log(product);
               for(var p of product){
                    html+=`
                        <li>
                             <a href="${p.href}">
                                  <div class="img">
                                       <img src="${p.pic}" alt="">
                                  </div>
                                  <div class="text">
                                       <p>${p.title}</p>
                                       <span>${p.price.toFixed(2)}</span>
                                  </div>
                             </a>
                        </li>`
                   };
               $("#maotai_right_data").html(html);
               //一楼商品
               var product=products.slice(11,15);
               //console.log(product);
               var html="";
               html+=`<div class="big_pic" >
                         <a href="${products[44].href}">
                              <div class="img">
                                   <img src="${products[44].pic}" alt="">
                              </div>			
                         </a>			
                    </div>`;
               for (var p of product){
                    html+=`<div class="small_pic">
                              <a href="${p.href}">
                                   <div class="img">
                                        <img src="${p.pic}" alt="">
                                   </div>
                                   <div class="text">
                                        <p>${p.title}</p>
                                        <span>${p.price.toFixed(2)}</span>
                                   </div>
                              </a>
                         </div>`;
               };
               $("#floor_one_data").html(html);
               //二楼商品
               var product=products.slice(15,19);
               //console.log(product);
               var html="";
               html+=`<div class="big_pic" >
                         <a href="${products[45].href}">
                              <div class="img">
                                   <img src="${products[45].pic}" alt="">
                              </div>			
                         </a>			
                    </div>`;
               for (var p of product){
                    html+=`<div class="small_pic">
                              <a href="${p.href}">
                                   <div class="img">
                                        <img src="${p.pic}" alt="">
                                   </div>
                                   <div class="text">
                                        <p>${p.title}</p>
                                        <span>${p.price.toFixed(2)}</span>
                                   </div>
                              </a>
                         </div>`;
               };
               $("#floor_two_data").html(html);
               //三楼商品
               var product=products.slice(19,23);
               //console.log(product);
               var html="";
               html+=`<div class="big_pic" >
                         <a href="${products[46].href}">
                              <div class="img">
                                   <img src="${products[46].pic}" alt="">
                              </div>			
                         </a>			
                    </div>`;
               for (var p of product){
                    html+=`<div class="small_pic">
                              <a href="${p.href}">
                                   <div class="img">
                                        <img src="${p.pic}" alt="">
                                   </div>
                                   <div class="text">
                                        <p>${p.title}</p>
                                        <span>${p.price.toFixed(2)}</span>
                                   </div>
                              </a>
                         </div>`;
               };
               $("#floor_three_data").html(html);
               //四楼
               var product=products.slice(23,27);
               //console.log(product);
               var html="";
               html+=`<div class="big_pic" >
                         <a href="${products[47].href}">
                              <div class="img">
                                   <img src="${products[47].pic}" alt="">
                              </div>			
                         </a>			
                    </div>`;
               for (var p of product){
                    html+=`<div class="small_pic">
                              <a href="${p.href}">
                                   <div class="img">
                                        <img src="${p.pic}" alt="">
                                   </div>
                                   <div class="text">
                                        <p>${p.title}</p>
                                        <span>${p.price.toFixed(2)}</span>
                                   </div>
                              </a>
                         </div>`;
               };
               $("#floor_four_data").html(html);
               //五楼
               var product=products.slice(27,31);
               //console.log(product);
               var html="";
               html+=`<div class="big_pic" >
                         <a href="${products[48].href}">
                              <div class="img">
                                   <img src="${products[48].pic}" alt="">
                              </div>			
                         </a>			
                    </div>`;
               for (var p of product){
                    html+=`<div class="small_pic">
                              <a href="${p.href}">
                                   <div class="img">
                                        <img src="${p.pic}" alt="">
                                   </div>
                                   <div class="text">
                                        <p>${p.title}</p>
                                        <span>${p.price.toFixed(2)}</span>
                                   </div>
                              </a>
                         </div>`;
               };
               $("#floor_five_data").html(html);
               //六楼
               var product=products.slice(31,35);
               //console.log(product);
               var html="";
               html+=`<div class="big_pic" >
                         <a href="${products[49].href}">
                              <div class="img">
                                   <img src="${products[49].pic}" alt="">
                              </div>			
                         </a>			
                    </div>`;
               for (var p of product){
                    html+=`<div class="small_pic">
                              <a href="${p.href}">
                                   <div class="img">
                                        <img src="${p.pic}" alt="">
                                   </div>
                                   <div class="text">
                                        <p>${p.title}</p>
                                        <span>${p.price.toFixed(2)}</span>
                                   </div>
                              </a>
                         </div>`;
               };
               $("#floor_six_data").html(html);
               //七楼
               var product=products.slice(35,39);
               //console.log(product);
               var html="";
               html+=`<div class="big_pic" >
                         <a href="${products[50].href}">
                              <div class="img">
                                   <img src="${products[50].pic}" alt="">
                              </div>			
                         </a>			
                    </div>`;
               for (var p of product){
                    html+=`<div class="small_pic">
                              <a href="${p.href}">
                                   <div class="img">
                                        <img src="${p.pic}" alt="">
                                   </div>
                                   <div class="text">
                                        <p>${p.title}</p>
                                        <span>${p.price.toFixed(2)}</span>
                                   </div>
                              </a>
                         </div>`;
               };
               $("#floor_seven_data").html(html);
               
                }
           })
      })

})()