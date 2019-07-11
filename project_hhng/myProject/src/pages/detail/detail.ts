import { Component } from '@angular/core';
import {AlertController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { NotFoundPage } from '../not-found/not-found';
import { CartPage } from '../cart/cart';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  title="商品详情"
  wid=0
  detail=[]
  detailpic=[]
  pics=[]
  loaddetailpic=[]
  pname=""
  price=""
  promise=""
  constructor(
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailPage');
    this.wid=this.navParams.get('wid');
    //console.log(this.wid);
    var url="http://127.0.0.1:8080/detail?wid="+this.wid;
    this.myHttp.get(url).subscribe((result:any)=>{
      //console.log(result);
      var {detail,detailpic,pics}=result.data;
      //console.log(detail);
      //console.log(detailpic);
      //console.log(pics);
      this.title=detail[0].title;
      this.pname=detail[0].pname;
      this.price=detail[0].price;
      this.promise=detail[0].promise;
      this.detail=detail;
      this.detailpic=detailpic;
      for(var tmp of pics){
        this.pics.push(tmp.md);
        //console.log(tmp.md)
      };
      var newdetpics=[];
      //console.log(detailpic[0]);
      var more=detailpic[0]
      for(var key in more){
        newdetpics.push(more[key])
        //console.log(more[key]);
      }
      newdetpics=newdetpics.splice(1);
      //console.log(newdetpics);
      this.loaddetailpic=newdetpics;
     
    })
  }
  ///加入购物车
  addcart(wid){
    var count=1;
    var url="http://127.0.0.1:8080/cart/add?wid="+wid+"&count="+count;
      this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
        //console.log(result);
        var msg='';
        if(result.code==1){
          msg="添加成功"
        }else if(result.msg=="login required"){
          var myAlert=this.alertCtrl.create({
            message:"添加失败,请登录",
            buttons:[
              {text:'确定',handler:()=>{this.navCtrl.push(LoginPage)}},
              {text:'取消',handler:()=>{return;}}
            ]
          });
          myAlert.present();
        }
        else{
          msg="添加失败"
        };
       var myToast= this.toastCtrl.create({
         message:msg,
         duration:2000,
       });
       myToast.present();
      })
       
  }
  ///跳转到404页面
  jumpNotFount(){
    this.navCtrl.push(NotFoundPage);
  }
  ///跳转到购物车
  jumpCart(){
    this.navCtrl.push(CartPage);
  }
  ///下拉加载图片
  loadMoreproduct(myInfinite){
    var newdetpics=[];
    //console.log(this.detailpic[0]);
    var more=this.detailpic[0]
    for(var key in more){
      newdetpics.push(more[key])
      //console.log(more[key]);
    }
    newdetpics=newdetpics.splice(1);
    //console.log(newdetpics);
    this.loaddetailpic=newdetpics;
    setTimeout(function(){myInfinite.complete();},1000)
  }

}
