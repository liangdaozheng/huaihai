//头部公共部分
(function(){
  $(function(){
    $.ajax({
      url:"header.html",
      type:"get",
      success(html){
      $(html).replaceAll("#header");
      $(`<link rel="stylesheet" href="css/header.css"/>`).appendTo("head");
      }
    })
  })
})()