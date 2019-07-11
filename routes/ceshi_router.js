function getPics(){
  var xhr= new XMLHttpRequest();
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      var result=xhr.responseText;
      var arr=JSON.parse(result);
      img1.src=arr[0].pic1;
      img2.src=arr[0].pic2;
      img3.src=arr[0].pic3;
      img4.src=arr[0].pic4;
      img5.src=arr[0].pic5;
      img6.src=arr[0].pic6;
      img7.src=arr[0].pic7;
      img8.src=arr[0].pic8;
      img9.src=arr[0].pic9;
      img10.src=arr[0].picb1;
      img11.src=arr[0].picb2;
      img12.src=arr[0].picb3;
    }
  }
  xhr.open("get","/user/ceshi?tid="+10,true);
  xhr.send(null);
}