import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { LoginPage } from '../login/login';
import { IndexPage } from '../index';
import { OrderConfirmPage } from '../order-confirm/order-confirm';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  key=false
  myList=[]
  isAllSelected=false
  constructor(
    private alertCtrl:AlertController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CartPage');
  }
   sortwines(cpp,wines){
    for(var i=0;i<(wines.length-1);i++){
      for(var j=0;j<(wines.length-i-1);j++){
        if(wines[j][cpp]<wines[j+1][cpp]){
          var temp=wines[j];
          wines[j]=wines[j+1];
          wines[j+1]=temp;
        }
      }
    }
    return wines
  }
  jumpIndex(){
    this.navCtrl.push(IndexPage);
  }
  ionViewWillEnter(){
    var url="http://127.0.0.1:8080/cart/list";
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
           for(var i=0;i<wines.length;i++){
            if(wines[i].is_checked==1){
              wines[i].isChecked=true;
            }else{
              wines[i].isChecked=false;
            }
          };
          var n=0;
          for(var i=0;i<wines.length;i++){
            if(wines[i].is_checked!=1){
             n++;
            }
          };
          if(n=0){
            this.isAllSelected=true
          }else{
            this.isAllSelected=false;
          }
          this.myList=wines;
      }///登录成功结尾
    })
  }
  ///操作全选
  operateAll(){
    for(var i=0;i<this.myList.length;i++){
      this.myList[i].isChecked=this.isAllSelected;
    };
    var is_checked=0;
    if(this.isAllSelected){
      is_checked=1
    }else{
      is_checked=0
    };
    var url="http://127.0.0.1:8080/cart/updatecheckedall?is_checked="+is_checked;
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      console.log(result);
      var msg='';
      if(result.code==1){
        msg="成功"
      }else{
        msg="失败";
        if(this.isAllSelected){
          this.isAllSelected=false;
          for(var i=0;i<this.myList.length;i++){
            if(this.myList[i].is_checked==1){
              this.myList[i].isChecked=true;
            }else{
              this.myList[i].isChecked=false;
            }
          };
        }else{
          this.isAllSelected=true;
          for(var i=0;i<this.myList.length;i++){
            if(this.myList[i].is_checked==1){
              this.myList[i].isChecked=true;
            }else{
              this.myList[i].isChecked=false;
            }
          };
        }
      };
      var myAlert= this.alertCtrl.create({
        message:msg,
        buttons:[
          {text:'确定'},
          {text:'取消',handler:()=>{return;}}
        ]
       });
       myAlert.present();
    })
  }
  operateSingle(event,cid){
    //console.log(event,cid);
    var result=true;
    for(var i=0;i<this.myList.length;i++){
      result=result&&this.myList[i].isChecked;
    };
    this.isAllSelected=result;
    var is_checked=0;
    if(event){is_checked=1}else{
      is_checked=0;
    };
    var url="http://127.0.0.1:8080/cart/updatechecked?is_checked="+is_checked+"&cid="+cid;
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result);
    })
  }
  ///价格函数
  caleAll(){
    var totalPrice=0;
    for(var i=0;i<this.myList.length;i++){
      if(this.myList[i].isChecked){
        totalPrice+=(this.myList[i].price*this.myList[i].count)
      }
    }
    return totalPrice;
  }
  //增加函数按钮
  clickBtn(status,cid,count){
    //console.log(status,cid,count);
    if(status=="-"){
      if(count>1){
        count--;
      }else{
        return;
      }
    }else{
      count++;
    };
    ///修改数组
    for(var i=0;i<this.myList.length;i++){
      if(this.myList[i].cid==cid){
        this.myList[i].count=count;
      }
    }
    ///updatecount
    var url="http://127.0.0.1:8080/cart/updatecount?count="+count+"&cid="+cid;
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result);
    })
  }
  ///删除按钮
  delCartItem(cid){
    //console.log(cid);
    var myAlert= this.alertCtrl.create({
      message:"确定删除该商品",
      buttons:[
        {text:'确定',handler:()=>{
          var url="http://127.0.0.1:8080/cart/del?cid="+cid;
          this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
            if(result.code==1){
              //console.log(cid);
              for(var i=0;i<this.myList.length;i++){
                if(this.myList[i].cid==cid){
                  this.myList.splice(i,1);
                }
              }
            }else{
              var myAlert= this.alertCtrl.create({
                message:"删除失败",
                buttons:[
                  {text:'确定',handler:()=>{return}},
                ]
               });
               myAlert.present();
            }
          })
        }},
        {text:'取消',handler:()=>{return;}}
      ]
     });
     myAlert.present();
  }
  //跳转到支付页面
  jumpPay(){
    this.navCtrl.push(OrderConfirmPage);
  }

}


