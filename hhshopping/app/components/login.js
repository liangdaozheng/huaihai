import React,{Component} from 'react';
import {TextInput,Button,View,Image} from 'react-native';


export default class LoginComponent extends Component{
  constructor(){
    super();
    this.state={uname:'',upwd:''}
  }
  handleLogin=()=>{
    //获取用户名和密码
    //提交请求
    console.log(this.state);
    var url="http://172.242.19.29:8080/signin"
    var config={
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      },
      body:`uname=${this.state.uname}&upwd=${this.state.upwd}`
     }
     fetch(url,config).then(response=>{
       return response.json();
     }).then(result=>{
       console.log(result);
       if(result.code==1){
         //登录成功
         this.props.navigation.push('main');
       }else{
         //清空输入框
         this.setState({uname:'',upwd:''});
          //alert登录失败
          alert('登录失败')
       }
     })
  }
  saveName=(msg)=>{
    //保存用户名
    this.setState({uname:msg})
  }
  savePwd=(msg)=>{
    //保存密码
    this.setState({upwd:msg})
  }
  render(){
    return (
      <View>
        <Image source={{uri:"http://lorempixel.com/200/200/"}} style={{height:100,width:100,borderRadius:50,alignSelf:"center"}}></Image>
        <TextInput onChangeText={this.saveName} placeholder="用户名" value={this.state.uname}></TextInput>
        <TextInput onChangeText={this.savePwd} placeholder="密码" secureTextEntry={true} value={this.state.upwd}></TextInput>
        <Button title="登录" onPress={this.handleLogin}></Button>
      </View>
    )
  }
}
