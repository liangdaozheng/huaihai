//商品的详情列表页
(function(){
  $(function(){
    //截取字符串，获取fid
    var fid=location.search.split("=")[1];
    if(!fid){
      //fid 为空的跳转到首页
     location.href="index.html";
    }else{
      //fid不为空
      //console.log(fid);
      //访问端口加载数据
      var url="productlist";
      var data={fid};
      var params={
          type:"get",
          dataType:"json"
          };
      window.ajax({url,data,params})
      .then(result=>{
        //console.log(result)
        //结构数据
        var {fname,wines,pics}=result.data;
        //console.log(fname);
        //console.log(wines);
        //console.log(pics);
        //数据页面的加载
        var html=`
            <tr>
            <td class="left">全部结果&gt;&gt;</td>
            <td class="center">
              <div>品牌：${fname[0].fname}</div>
            </td>
            <td class="right">
              <ul>
                <li><a href="javascript:;">${fname[0].fname}</a></li>
              </ul>
            </td>
          </tr>
        `;
        $("#winefname").html(html);
        //加载酒
        var html=`
            供<span>${wines.length}</span>件商品<span id="nowpage">1</span> / <a href="javascript:;">${Math.ceil(wines.length/20)}</a>
        `;
        $("#productcount").html(html);
        //封装按需排列商品函数
        
        ////
        $("#allcountnewprice").children().first().addClass("active").siblings().removeClass("active");
        /////封装冒泡函数及加载排序函数单击函数
      function countprice(win){
          var wines=win;
          function sortwines(cpp){
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
          //单击选项函数事件
        $("#allcountnewprice").on("click","li",function(){  
          var li=$(this);
          //console.log(li);
          li.addClass("active").siblings().removeClass("active");
          var cpp=li.attr("data-all");
          //console.log(cpp);
          if(cpp==='all'){
            return;
          }else{
            var wines=sortwines(cpp,wines);
            loadproduct(wines)
          }
        })
      };
        //function countpriceproduct(wines){
        //封装整个商品列表函数
      function loadproduct(wines){
          
        //图片及酒
        //封装图片路径
        function mdpic(wid){
          var  mdpic=[];
          for (var pic of pics){
            if(pic.wid==wid){
              mdpic.push(pic);
            }
          };
          return mdpic;
        };
        //封装小图片路径
        function smpics(wid){
         var pic= mdpic(wid);
          //console.log(pic)
          var hl=``;
          for (var p of pic){
            hl+=`
            <li class="${pic[0]==p?'active':''}" data-ullis="mouse"><img src="${p.sm}" alt data-md=${p.md} ></li>
            `;
          }
          return hl;
        };
        //console.log(smpics(85));
        var html=``;
        for (var wine of wines){
          html+=`
          <li class="list_sons">
          <div class="list_son">
            <!-- 照片部分 -->
            <div class="pics">
              <a href="product_detail.html?wid=${wine.wid}">
                <div><img class="big_pic_box" src="${mdpic(wine.wid)[0].md}"></img></div>
              </a>
              <div class="small_pic">
                <ul class="small_pic_list" >
                  ${smpics(wine.wid)}
                </ul>
              </div>
              <div class="jian_head">
                <a class="left" href="javascript:;"><img src="img/qleft.png" alt></a>
                <a class="right" href="javascript:;"><img src="img/qright.png" alt></a>
              </div>
            </div>
            <!-- 大价格部分 -->
            <a href="javascript:;">
              <span class="price">${wine.price.toFixed(2)}</span>
              <div class="name">
                <em>${wine.title}</em> ${wine.subtitle+" "+wine.spec+" "+wine.memory}
              </div>
            </a>
            <!--商城标识  -->
            <a href="javascript:;">
              <div class="shop_home">
                <span>怀海商城</span>
                <img src="img/proList.png" alt>
              </div>	
            </a>
            <!-- 月销量 -->
            <div class="count">
              <span>月销量${wine.sold_count}件</span>
            </div>
            <!-- 收藏 购物车 -->
            <div class="butt">
              <a href="javascript:;" class="btn">
                <div>
                  <i class="cang"></i>
                  <span data-wid=${wine.wid} data-cang="listcang">收藏</span>
                </div>
              </a>
              <a href="javascript:;" class="btn">
                <div class="cart">
                  <i class="jia"></i>
                  <span data-wid=${wine.wid} data-cart="listcart">加入购物车</span>
                </div>
              </a>
            </div>
          </div>
        </li>
          `;
        }
        $("#wineinfo").html(html);
        /////单击销量事件
        countprice(wines)
        //鼠标移入小图标事件
        picsevent();
        //购物车函数位置处
        listcang()
        listcart()


      };
      //加载页面开始为前20个
      (function(){
        var newwines=[] ;
          if(wines.length<=20){
            newwines=wines;
          }else{
            for (var i=0;i<=19;i++){
              newwines.push(wines[i]);
            }; 
          }
        loadproduct(newwines);
      })()
      //判断wine的数量加载页面
      if(wines.length<=20){
        $("#footpagenav").css({"display":"none"});
        $("#gotoback").css({"display":"none"});
        $("#gotonext").css({"display":"none"});
      }else{
        var num=Math.ceil(wines.length/20);
        //console.log(num)
        var html=``;
        for (var i=1;i<=num;i++){
          html+=`
            <li class="${i==1?'ac_color':''}" data-page="active"><a href="javascript:;" >${i}</a></li>
          `;
        };
        $("#nextpage").before(html);
        //封装截取数组函数
        function slicewines(n){
          var start=(n-1)*20;
          var newwines=[] ;
          if(n<num){
            for (var i=start;i<=(start+19);i++){
              newwines.push(wines[i]);
            };
          }else if(n==num){
            //不足20个截取到最后
            for (var i=start;i<=wines.length-1;i++){
              newwines.push(wines[i]);
            };
          };
          //console.log(newwines);
          //console.log(wines)
          return newwines;
        };
        //为选中的页码加属性
        $("#pagenavlist").on("click","[data-page='active']",function(){
          var li=$(this);
          li.addClass("ac_color").siblings().removeClass("ac_color");
          //console.log(li[0].innerText) 获取当前元素的内容dom
          //console.log(li.text());
          var index=li.text();
          $("#nowpage").html(index);
          if(index==1){
            $("#prevpage").css({"display":"none"});
            $("#nextpage").css({"display":"block"});
            $("#gotoback").css({"display":"none"});
            $("#gotonext").css({"display":"block"});
          }else if(index==num){
            $("#nextpage").css({"display":"none"});
            $("#prevpage").css({"display":"block"});
            $("#gotoback").css({"display":"block"});
            $("#gotonext").css({"display":"none"});
          }
          //调用截取数组
          var wines=slicewines(index);
          //调用加载函数
          //console.log(wines);
          loadproduct(wines);
        })
        //初始化上一页禁用
        $("#prevpage").css({"display":"none"});
        //下一页按钮
        $("#nextpage").click(function(){
          $("#prevpage").css({"display":"block"});
          var index=$("#pagenavlist li.ac_color a").html();
          index++;
          $("#pagenavlist").children().eq(index).addClass("ac_color").siblings().removeClass("ac_color");
          $("#nowpage").html(index);
          //调用截取数组
          var wines=slicewines(index);
          //调用加载函数
          //console.log(wines);
          loadproduct(wines);
          if(index>=num){
            $("#nextpage").css({"display":"none"});
            $("#gotoback").css({"display":"block"});
            $("#gotonext").css({"display":"none"});
          }
        });
        //上一页按钮
        $("#prevpage").click(function(){
          $("#nextpage").css({"display":"block"});
          var index=$("#pagenavlist li.ac_color a").html();
          index--;
          $("#pagenavlist").children().eq(index).addClass("ac_color").siblings().removeClass("ac_color");
          $("#nowpage").html(index);
          //调用截取数组
          var wines=slicewines(index);
          //调用加载函数
          //console.log(wines);
          loadproduct(wines);
          if(index<=1){
            $("#prevpage").css({"display":"none"});
            $("#gotoback").css({"display":"none"});
            $("#gotonext").css({"display":"block"});
          }
        });
        //跳动第几页
        $("#jumpbtn").click(function(){
          var index=$("#jumppage").val();
          //console.log(index);
          //判断index
          var index=Math.floor(index);
          if(index<=num){
          //上面元素显示第几页
            $("#nowpage").html(index);
            if(index==1){
              $("#prevpage").css({"display":"none"});
              $("#nextpage").css({"display":"block"});
              $("#gotoback").css({"display":"none"});
              $("#gotonext").css({"display":"block"});
            }else if(index==num){
              $("#nextpage").css({"display":"none"});
              $("#prevpage").css({"display":"block"});
              $("#gotoback").css({"display":"block"});
              $("#gotonext").css({"display":"none"});
            };
            //数字块加载颜色
            $("#pagenavlist").children().eq(index).addClass("ac_color").siblings().removeClass("ac_color");
            //调用截取数组
            var wines=slicewines(index);
            //调用加载函数
            //console.log(wines);
            loadproduct(wines);
          }else{
            return;
          }
        })
        //左右显示页面的箭头
        //左右两个函数,获取前面的值自++,然后复制调用上面的函数
        $("#gotoback").css({"display":"none"});
        //左箭头
        $("#gotoback").click(function(){
          var index=$("#nowpage").html();
          if(index==1){
            $("#nowpage").html(index);
            $("#gotoback").css({"display":"none"});
            $("#gotonext").css({"display":"block"});
          }else{
            index--;
            if(index==1){ $("#gotoback").css({"display":"none"});};
            $("#nowpage").html(index);
            $("#gotonext").css({"display":"block"});
            //加载数据
            if(index==1){
              $("#prevpage").css({"display":"none"});
              $("#nextpage").css({"display":"block"});
            }else if(index==num){
              $("#nextpage").css({"display":"none"});
              $("#prevpage").css({"display":"block"});
            };
            //数字块加载颜色
            $("#pagenavlist").children().eq(index).addClass("ac_color").siblings().removeClass("ac_color");
            //调用截取数组
            var wines=slicewines(index);
            //调用加载函数
            //console.log(wines);
            loadproduct(wines);
          }
        });
        //右箭头
        $("#gotonext").click(function(){
          var index=$("#nowpage").html();
          if(index==num){
            $("#nowpage").html(index);
            $("#gotoback").css({"display":"block"});
            $("#gotonext").css({"display":"none"});
          }else{
            index++;
            if(index==num){$("#gotonext").css({"display":"none"});};
            $("#nowpage").html(index);
            $("#gotoback").css({"display":"block"});
            //加载数据
            if(index==1){
              $("#prevpage").css({"display":"none"});
              $("#nextpage").css({"display":"block"});
            }else if(index==num){
              $("#nextpage").css({"display":"none"});
              $("#prevpage").css({"display":"block"});
            };
            //数字块加载颜色
            $("#pagenavlist").children().eq(index).addClass("ac_color").siblings().removeClass("ac_color");
            //调用截取数组
            var wines=slicewines(index);
            //调用加载函数
            //console.log(wines);
            loadproduct(wines);
          }
        });
                 
      }//wines>20的结尾
      
    //};//封装countpriceproduct(wines)的结尾
      //按需选择排列商品
      //countpriceproduct(wines);
      //console.log($("li[data-ullis='mouse']"));鼠标移入小图事件
      function picsevent(){
      $("li[data-ullis='mouse']").hover(function(){
        var $li=$(this);
        //console.log($li);
        $li.addClass("active").siblings().removeClass("active");
        var src=$li.children().first().attr("data-md");
        //console.log(src);
        $li.parent().parent().parent().children().first().children().first().children().first().attr("src",src); 
      });
      };
      picsevent();
      //购物车详细功能封装函数
      ///收藏功能添加函数
      function listcang(){
        $("span[data-cang='listcang']").click(function(){
          //console.log($(this));
          var $span=$(this);
          //var wid=$(this)[0].dataset.wid;
         // console.log(wid);
          if(sessionStorage.uid!=undefined){
            $(this).html("成功");
          }else{
            $(this).html("请登录");
          };
          setTimeout(function(){$span.html("收藏")},1000);
        })
      };
      function listcart(){
        var key=true;
        $("span[data-cart='listcart']").click(function(){
          //console.log($(this));
          var $span=$(this);
          var wid=$(this)[0].dataset.wid;
          var count=1;
          //console.log(wid);
          if(sessionStorage.uid!=undefined){
            if(key){
              key=false;
              var url="cart/add";
              var data={wid,count};
              var params={
                  type:"get",
                  dataType:"json"
                  };
              window.ajax({url,data,params})
              .then(result=>{
                //console.log(result);
                if(result.code==1){
                  key=true;
                  $span.html("添加成功");
                  setTimeout(function(){
                    $span.html("加入购物车");
                },1000);
                }else{
                  key=true;
                  $span.html("添加失败");
                  setTimeout(function(){
                    $span.html("加入购物车");
                },1000);
                }
              })
            }else{
              $span.html("数据处理中");
              setTimeout(function(){$span.html("加入购物车");},1000);
            }
          }else{
            $span.html("请登录");
            setTimeout(function(){$span.html("加入购物车");},1000);
          }
        })
      }


      //综合销量新品价格 四个函数,把wines数组重新排序再加载countpriceproduct(wines);封装冒泡函数 cpp为传入的条件sold_count/shelf_time/price
      
      //1综合countpriceproduct(wines);直接加载
      // $("#allcountnewprice").children().first().addClass("active").siblings().removeClass("active");
      // $("#allcountnewprice").on("click","li",function(){
      //   var li=$(this);
      //   //console.log(li);
      //   li.addClass("active").siblings().removeClass("active");
      //   var cpp=li.attr("data-all");
      //   console.log(cpp);
      //   if(cpp==='all'){
      //     return;
      //   }else{
      //     var wines=sortwines(cpp);
      //     countpriceproduct(wines);
      //     picsevent()
      //   }
      // })
      // $("#allmores").addClass("active").siblings().removeClass("active");
      // $("#allmores").click(()=>{
      //   $("#allmores").addClass("active").siblings().removeClass("active");
      //   countpriceproduct(wines);
      // })
      // //2销量sold_count 排序
      // $("#soldcount").click(()=>{
      //   $("#soldcount").addClass("active").siblings().removeClass("active");
      //   //调用冒泡函数
      //   var wines=sortwines('sold_count');
      //   //加载数据
      //   countpriceproduct(wines);
      // })
      // //console.log(sortwines('sold_count'))
      // //3新品shelf_time
      // //newproduct
      // $("#newproduct").click(()=>{
      //   $("#newproduct").addClass("active").siblings().removeClass("active");
      //   //调用冒泡函数
      //   var wines=sortwines('shelf_time');
      //   //加载数据
      //   countpriceproduct(wines);
      // })
      // //4价格price
      // //productprice
      // $("#productprice").click(()=>{
      //   $("#productprice").addClass("active").siblings().removeClass("active");
      //   //调用冒泡函数
      //   var wines=sortwines('price');
      //   //加载数据
      //   countpriceproduct(wines);
      // })
      
     
      
      })
      .catch(err=>console.log(err))
    }
  })
  //
})()