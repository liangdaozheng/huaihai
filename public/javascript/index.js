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
     
      //右侧购物车区域的显隐
      var $cart=$("#cart_visib_left");
      var $msg=$("#index_right_column");
      $cart.click(function(){
          var rth=parseInt($msg.css("right"));
          if(rth<0){$msg.css("right",0)}else{$msg.css("right",-325)}
      });
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