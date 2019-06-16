//所有内容放在一个函数自调用中，全局变量的污染
(function(){
  $(function(){
    //截取字符串，获取wid
    var wid=location.search.split("=")[1];
   if(!wid){
      //wid 为空的跳转到首页
     location.href="index.html";
   }else{
    //wid不为空
    //console.log(wid);
     var url="detail";
     var data={wid};
     var params={
          type:"get",
          dataType:"json"
          };
    window.ajax({url,data,params})
    .then(result=>{
      //console.log(result);
      //结构出结果来
      var {detail,pics,detailpic}=result.data;
      console.log(detail,pics,detailpic);
      //单品商品的对象
      var detail=detail[0];
      var html=`
        <a href="product_list.html?fid=${detail.fid}">${detail.title}</a>
        <span>&gt;&gt;</span>
        <a href="product_list.html?fid=${detail.fid}">${detail.subtitle}</a>
      `;
      $("#aside_row_left").html(html);
      //放大镜功能的实现
      //小图片加载
      var html=``;
      for (var pic of pics){
        html+=`
          <li><img src="${pic.sm}" alt data-md="${pic.md}" data-lg="${pic.lg}"></li>
        `;
      };
      var $ulimg=$("#small_pics_box");
      $ulimg.html(html);
      //添加默认大图
      var $mdpic=$("#mdpic");
      $mdpic.attr("src",pics[0].md);
      //默认放大图
      var $supimg=$("#super_picture");
      $supimg.css("background-image",`url(${pics[0].lg})`);
      //鼠标的移入事件，切换图片的路径
      $ulimg.on("mouseenter","img",function(){
        var $img=$(this);
        var src=$img.attr("data-md");
        $mdpic.attr({src});
        var backgroundImage=
        `url(${$img.attr("data-lg")})`
        $supimg.css({backgroundImage});
      })
      //给中图框绑定鼠标移动事件
      //放大图标
      var $mask=$("#crosshair");
      var $supmask=$("#big_picture_tar");
      //鼠标移入移除事件,放大镜和放大图的显隐
      $supmask.hover(function(){
        $mask.toggleClass("display_block");
        $supimg.toggleClass("display_block");
      })
      //放大镜跟随鼠标事件
      $supmask.mousemove(function(e){
        var left=e.offsetX-117.5;
        var top=e.offsetY-105;
        if(left<0) left=0; 
        else if(left>181) left=181;
        if(top<0) top=0; 
        else if(top>210) top=210;
        $mask.css({top,left});
        //放大图框是放大镜的两倍
        $supimg.css("background-position",`-${left*2}px -${top*2}px`)
      });
      //右边详细信息
      var html=`
        <span class="self">自营</span>${detail.pname}
      `;
      $("#right_title").html(html);
      //价格
      var html= `
        <em>￥</em>
        <span class="show_price" >${detail.price.toFixed(2)}</span>
      `;
      $("#show_price").html(html);
      //产品规格
      var html=`
      <div class="box_boy clearboth">
        <div class="left clearboth">净含量</div>
        <div class="right clearboth"><a class="mmll" href="javascript:;">${detail.memory}</a></div>
      </div>
      <div class="box_boy clearboth">
        <div class="left clearboth">酒家</div>
        <div class="right clearboth"><a class="mmll" href="javascript:;">${detail.category}</a></div>
      </div>
    
      <div class="box_boy clearboth">
        <div class="left clearboth">酒精度</div>
        <div class="right clearboth"><a class="mmll" href="javascript:;">${detail.spec}</a></div>
      </div>
      `;
      $("#product_det").html(html);
      //已售数量
      var html=`
        <span>已售</span>
        <span>${detail.sold_count}</span>
        <span>瓶</span>
      `;
      $("#sold_count").html(html);
      //详情图片区单击事件
      var $menunav=$("#menu_nav");
      var $detailpic=$("#some_one");
      var $backpro=$("#some_two");
      var $art=$("#some_three");
      $menunav.children("li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        if($(this).is("#backpro")){
          $backpro.css({"display":"block"}).siblings().css({"display":"none"})
        }else if($(this).is("#art")){
          console.log($(this));
          $art.css({"display":"block"}).siblings().css({"display":"none"})
        }else{
          $detailpic.css({"display":"block"}).siblings().css({"display":"block"})
        }
      });
      //产品详情介绍
      var html=`
          <tr>
            <td class="pingpai"><div>品牌：<a href="javascript:;">${detail.category}</a></div></td>
          </tr>
          <tr>
            <td class="productname"><div>商品名称：<a href="javascript:;">${detail.pname}</a></div></td>
          </tr>
      `;
      $("#some_one>div>table>tbody").html(html);
      //图片详情介绍
      var dets=detailpic[0];
      //创建一个文档片段
      var frag=document.createDocumentFragment();
      for (var key in dets){
        //遍历循环获取图片路径
        if(key!=="tid"){
          var img=new Image();
          img.src=dets[key];
          frag.appendChild(img);
        }
      };
      //将文档片段添加到页面中
      $("#detail_pic").html(frag);
      //地址的选着
      //添加购物车功能



    }) 
    .catch(error=>console.log(error))
   }
  })
})()
