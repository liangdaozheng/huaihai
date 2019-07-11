function ajax({url, data, params}) {
  return new Promise(function(open, reject) {
      $.ajax({
          url: "http://127.0.0.1:8080/" + url,
          type: params && params.type || 'post',
          dataType: params && params.dataType || 'JSON',
          data: data,
          xhrFields:{withCredentials:true},
          crossDomain:true,
          success: function(res) {
              open(res)
          },
          error: function(res) {
              alert(res.m)
          }
      });
  });

}

//data 为数据对象
//params 为有两个属性的type，dataType的对象