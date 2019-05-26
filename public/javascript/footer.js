//页面公共的底部
(function(){
  $(function(){
    $.ajax({
      url:"footer.html",
      type:"get",
      success(html){
        $(html).replaceAll("#footer");
        $(`<link rel="stylesheet" href="css/footer.css"/>`).appendTo("head")
      }
    })
  })
})()