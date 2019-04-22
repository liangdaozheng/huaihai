//注册 名称行的获取焦点的提示
function getRegName(){
	uname_p.innerHTML="请输入您的注册用名";
}
//注册 名称行的失去焦点的验证
function loseRegName(){
	if(uname.value==""){
		uname_p.innerHTML="用户名不能为空";
	}else{
		//注册名不空，检验用户名是否可用，请求数据验证
		//1创建异步请求对象
		var xhr= new XMLHttpRequest();
		//4创建监听，接收响应数据
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var result=xhr.responseText;
				var arr=JSON.parse(result);
				//console.log(arr);
				if(arr[0].code==400){
					uname_p.innerHTML=arr[0].msg;
				}else if(arr[0].code==200){
					uname_p.innerHTML=arr[0].msg;
				};
			};
		}
		//2打开连接，post的请求
		xhr.open("post","/user/reg_uname",true)
		//3修改请求的头部信息，发送请求；
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var formdata="uname="+uname.value;
		xhr.send(formdata);
	}
}
//注册 密码行的获取焦点的提示
function getRegUpwd(){
	upwd_p.innerHTML="密码为6~18位";
}
//注册 密码行的失去焦点的验证
function loseRegUpwd(){
	if(upwd.value==""){
		upwd_p.innerHTML="密码不能为空";
	}else{
		upwd_p.innerHTML="密码格式正确";
	};
}
//注册 密码确认行的获取焦点的提示
function getRegOk(){
	ok_upwd_p.innerHTML="请再次输入密码";
}
//注册 密码确认行的失去焦点的验证
function loseRegOk(){
	if(ok_upwd==""){
		ok_upwd_p.innerHTML="请输入正确密码";
	}else if(ok_upwd.value===upwd.value){
		ok_upwd_p.innerHTML="密码正确";
	}else{
		ok_upwd_p.innerHTML="两次输入不一致,请输入正确的密码";
	};
}
//注册 邮箱行获取焦点的提示
function getRegEmail(){
	email_p.innerHTML="请输入您的电子邮箱";
}
//注册 邮箱行失去焦点的验证
function loseRegEmail(){
	if(email.value==""){
		email_p.innerHTML="电子邮箱不能为空";
	}else{
		email_p.innerHTML="电子邮箱格式正确";
	};
}
//注册 手机行获取焦点的提示
function getRegPhone(){
	phone_p.innerHTML="请输入您的手机号";
}

//注册 手机行失去焦点的验证
function loseRegPhone(){
	if(phone.value==""){
		phone_p.innerHTML="手机号码不能为空";
	}else{
		phone_p.innerHTML="手机号码正确";
	};
}
//注册 注册资料提交
function register(){
	//验证各项数据是否为空或正确
	if(uname.value==""){
		alert("用户名称有误，注册失败");
		return;
	};
	if(upwd.value==""||upwd.value !==ok_upwd.value){
		alert("注册密码有误，注册失败");
		return;
	};
	if(email.value==""){
		alert("电子邮箱有误，注册失败");
		return;
	};
	if(phone.value==""){
		alert("手机号码有误，注册失败");
		return;
	};
	//1创建异步请求
	var xhr= new XMLHttpRequest();
	//4创建监听，获取响应数据
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var result=xhr.responseText;
			var arr=JSON.parse(result);
			//console.log(arr);
			if(arr[0].code==200){
				alert(arr[0].msg);
				location.href="http://127.0.0.1:8080/login.html";
			}else if(arr[0].code==400){
				alert(arr[0].msg);
			};
		};
	};
	//2打开连接
	xhr.open("post","/user/register",true);
	//3设置请求的头信息，发送请求
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var formdata="uname="+uname.value+"&upwd="+upwd.value+"&email="+email.value+"&phone="+phone.value;
	xhr.send(formdata);
}
