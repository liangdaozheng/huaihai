//所有内容放在一个函数自调用中，全局变量的污染
(function(){
//顶部搜索框的滚动操作
$(window).scroll(function(){
  //通过scrollTop获取到滚动条滚动的高度，判断条件高度>=33
  if($(window).scrollTop()>=182){
       //修改#top的显隐性
       $("#index_search_row").css("display","block")
  }else(
       //修改#top的显隐性
       $("#index_search_row").css("display","none")
  )
  
});



  















})()