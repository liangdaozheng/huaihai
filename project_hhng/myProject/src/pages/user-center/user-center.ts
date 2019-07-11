import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { IndexPage } from '../index';

/**
 * Generated class for the UserCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  key=false
  myName=''
  myPhone=''
  constructor(
    private alertCtrl:AlertController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserCenterPage');
  }
  ///
  ionViewWillEnter(){
    var url="http://127.0.0.1:8080/selectuname/phone";
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result);
      if(result.code!=1){
        this.key=false;
        this.alertCtrl.create({
          message:"是否需要去登录",
          buttons:[
            {text:'确定',handler:()=>{this.navCtrl.push(LoginPage)}},
            {text:'取消',handler:()=>{this.navCtrl.parent.select(0);}}
          ]
         }).present();
      }else{
        this.key=true;
        var {uid,uname,phone}=(result.data)[0];
        //console.log(uid,uname,phone);
        this.myName=uname;
        this.myPhone=phone;
      }
    })
  }
  ///退出登录按钮
  signOut(){
    this.alertCtrl.create({
      message:"确定退出登录",
      buttons:[
        {text:'确定',handler:()=>{
          var url="http://127.0.0.1:8080/signout";
          this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
            //console.log(result);
            this.navCtrl.parent.select(0); 
          })
        }},
        {text:'取消',handler:()=>{return;}}
      ]
    }).present();
  }
  ////
}
