import { Component } from '@angular/core';
import {AlertController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname=''
  upwd=''
  constructor(
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  ////登录
  signIn(){
    //console.log(this.uname,this.upwd);
    var url="http://127.0.0.1:8080/signin"//mod?uname="+this.uname+"&upwd="+this.upwd;
    //var url="http://localhost:8088/user/login"
    ///post 的请求
    this.myHttp.post(url,{uname:this.uname,upwd:this.upwd},{withCredentials:true}).subscribe((result:any)=>{
    // this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result);
      if(result.code==1){
        this.navCtrl.pop();
      }else{
        this.toastCtrl.create({
          message:"登录失败",
          duration:2000
        }).present();
      }
    })
  }
  clickReg(){
    //console.log(111);
    var myAlert= this.alertCtrl.create({
      message:"系统升级中,请去网页版注册",
      buttons:[
        {text:'确定'},
      ]
     });
     myAlert.present();
  }
  clickPwd(){
    //console.log(222);
    var myAlert= this.alertCtrl.create({
      message:"请用注册邮箱,发邮件联系我们",
      buttons:[
        {text:'确定'},
      ]
     });
     myAlert.present();
  }



}
