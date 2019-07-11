import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController} from 'ionic-angular';
// import { CartPage } from '../cart/cart';
// import { IndexPage } from '../index';

/**
 * Generated class for the PayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  count=0
  payName='xiaoyubufan'
  payNumber='微信'
  constructor(
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private viewCtrl:ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PayPage');
    //var count=this.navParams.get('count');
    //console.log(count);
    //this.count=count;
  }
  ionViewWillEnter(){
    var count=this.navParams.get('count');
    //console.log(count);
    this.count=count;
  }
  //help函数
  help(){
    var myalert=this.alertCtrl.create({
      message:"对支付金额有疑问吗？",
      buttons:[
        {text:'确定',handler:()=>{this.viewCtrl.dismiss({id:0})}},
        {text:'取消',handler:()=>{return;}}
      ]
    })
    myalert.present()
  }
  ///确认支付
  payOk(){
    //this.navCtrl.parent.select(0)
     this.loadingCtrl.create({
      content:'数据处理中···',
      duration:3000
    }).present();
    setTimeout(()=>{this.viewCtrl.dismiss({id:1})},3500)   
  }
  closeModal(){
    this.viewCtrl.dismiss({id:0})
  }
}
