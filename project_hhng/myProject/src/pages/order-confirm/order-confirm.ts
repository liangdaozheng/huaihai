import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from '../login/login';
import { PayPage } from '../pay/pay';

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  key=false
  myList=[]
  allPayCount=0
  myName='小雨不凡'
  myAdd='北京的北京区石景山小镇门头沟下的首钢大烟囱108号'
  myPhone='18009908008'
  constructor(
    private alertCtrl:AlertController,
    private myModel:ModalController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  sortwines(cpp,wines){
    for(var k=0;k<(wines.length-1);k++){
      for(var j=0;j<(wines.length-k-1);j++){
        if(wines[j][cpp]<wines[j+1][cpp]){
          var temp=wines[j];
          wines[j]=wines[j+1];
          wines[j+1]=temp;
        }
      }
    }
    return wines
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad OrderConfirmPage');
  }
  ionViewWillEnter(){
    var url="http://127.0.0.1:8080/cart/list";
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result);
      if(result.code!=1){
        this.key=false;
        this.alertCtrl.create({
          message:"系统需要重新登录",
          buttons:[
            {text:'确定',handler:()=>{this.navCtrl.push(LoginPage)}},
            {text:'取消',handler:()=>{this.navCtrl.parent.select(1);}}
          ]
         }).present();
      }else{
        this.key=true;
        var {cart,pics,wins}=result.data;
        //console.log(cart,pics,wins);      
           //重组数据 冒泡函数
           //图片去重
           var carte=this.sortwines("wid",cart);
           var pices=this.sortwines("wid",pics);
           var wines=this.sortwines("wid",wins);
           var more=[];
           for(var i=0;i<pices.length-1;i++){
             if(pices[i].wid!=pices[i+1].wid){
               //console.log(arr[i].wid);
               more.push(pices[i].sm);
             }
           };
           more.push(pics[pics.length-1].sm);
           //console.log(more);
           ///添加需要的数据
           for(var j=0;j<wins.length;j++){
                wines[j].sm=more[j];
                wines[j].cid=carte[j].cid;
                wines[j].count=carte[j].count;
                wines[j].is_checked=carte[j].is_checked;
           };
           //console.log(wines);////保存数据
           var checkedwines=[];
           var allPayCount=0;
           for(var p=0;p<wines.length;p++){
            if(wines[p].is_checked==1){
              checkedwines.push(wines[p]);
              allPayCount+=wines[p].price*wines[p].count;
            }
          };
          //console.log(allPayCount);
          //console.log(checkedwines);
          this.allPayCount=allPayCount;
          this.myList=checkedwines;
      }///登录成功结尾
    })
  }
  ///跳回上一页
  jumpPre(){
    this.navCtrl.pop();
  }
  //确认支付
  confirmPay(){
    //console.log(this.allPayCount);
    var myModels=this.myModel.create(PayPage,{count:this.allPayCount});
    myModels.present();
    myModels.onDidDismiss((data)=>{
      //data.id就是在关闭时 顺便传递来的值 0为未支付，1为支付成功
      //console.log(data.id);
      //console.log(this.navCtrl.parent);
      if(data.id==0){
        return;
      }else if(data.id==1){  
        var url="http://127.0.0.1:8080/cart/delchecked?is_checked=1";
        this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
          //console.log(result);
          if(result.code==1){
            this.myList=[];
            var myAlert= this.alertCtrl.create({
              message:"是否要返回到购物车？",
              buttons:[
                {text:'确定',handler:()=>{this.navCtrl.parent.select(1);}},
                {text:'取消',handler:()=>{this.navCtrl.parent.select(0);}}
              ]
             });
             myAlert.present();
          }else{
            this.alertCtrl.create({
              message:"系统出错了,即将联系你？",
              buttons:[
                {text:'确定',handler:()=>{this.navCtrl.parent.select(1);}},
              ]
             }).present();
            
          } 
          //this.navCtrl.parent.select(0);  
        })
      }
    })
  }
///结尾
}
