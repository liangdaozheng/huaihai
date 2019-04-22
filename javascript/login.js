//用户行获取焦点
		function getUname(){
			puname.innerHTML="您注册时的用户名";
		};
//用户行失去焦点
		function loseUname(){
			if(uname.value==""){
				puname.innerHTML="用户名不能为空";
			}else{
				//1创建异步对象
				var xhr= new XMLHttpRequest();
				//4创建异步监听
				xhr.onreadystatechange=function(){
					if(xhr.readyState==4&&xhr.status==200){
						var result=xhr.responseText;
						var arr=JSON.parse(result);
						if(arr[0].code==200){
							puname.innerHTML=arr[0].msg;
						}else if(arr[0].code==400){
							puname.innerHTML=arr[0].msg;
						};
					};
				};
				//2打开连接post请求,/getuname
				xhr.open("post","/user/getuname",true);
				//3设置请求头信息行，发送请求
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var formdata="uname="+uname.value;
				xhr.send(formdata);
			};
		};
//密码行获取焦点
		function getUpwd(){
			pupwd.innerHTML="您在这的密码";
		};
//密码行失去焦点
		function loseUpwd(){
			if(upwd.value==""){
				pupwd.innerHTML="密码不能为空";
			}else{
				pupwd.innerHTML="除了空我什么也不知";
			};
		};
//用户登录验证
		function getLogin(){
			//1创建异步请求对象
			var xhr= new XMLHttpRequest();
			//4创建监听
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					var result=xhr.responseText;
					console.log(result);
					var arr=JSON.parse(result);
					console.log(arr);
					if(arr[0].code==200){
						alert(arr[0].msg);
					}else if(arr[0].code==400){
						alert(arr[0].msg);
					};
				};
			};
			//2打开连接
			xhr.open("post","/user/login",true);
			//设置请求头信息
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			//3发送请求
			var formdata="uname="+uname.value+"&upwd="+upwd.value;
			xhr.send(formdata);
		};