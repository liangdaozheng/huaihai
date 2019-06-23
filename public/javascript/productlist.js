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
        console.log(fname);
        console.log(wines);
        console.log(pics);
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
        function countpriceproduct(wines){
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
            <li class="${pic[0]==p?'active':''}"><img src="${p.sm}" alt data-md=${p.md} ></li>
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
                <ul class="small_pic_list">
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
                  <span data-wid=${wine.wid}>收藏</span>
                </div>
              </a>
              <a href="javascript:;" class="btn">
                <div class="cart">
                  <i class="jia"></i>
                  <span data-wid=${wine.wid}>加入购物车</span>
                </div>
              </a>
            </div>
          </div>
        </li>
          `;
        }
        $("#wineinfo").html(html);
      };
      //加载页面开始为前20个
      (function(){
        var newwines=[] ;
          for (var i=0;i<=19;i++){
            newwines.push(wines[i]);
          }; 
        loadproduct(newwines);
      })()
      //判断wine的数量加载页面
      if(wines.length<=20){
        $("#footpagenav").css({"display":"none"})
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
          }else if(index==num){
            $("#nextpage").css({"display":"none"});
            $("#prevpage").css({"display":"block"});
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
          }else{
            return;
          }
        })
        //左右显示页面的箭头
        //左右两个函数,获取前面的值自++,然后复制调用上面的函数

      }//wines>20的结尾
    };//封装countpriceproduct(wines)的结尾
      //按需选择排列商品
      countpriceproduct(wines);
      //综合销量新品价格 四个函数,把wines数组重新排序再加载countpriceproduct(wines);
      //1综合countpriceproduct(wines);直接加载
      //2销量sold_count 排序
      //3新品shelf_time
      //4价格price
      //
      //购物车详细功能
      })
      .catch(err=>console.log(err))
    }
  })
  //
})()