import { Component } from '@angular/core';
import {AlertController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { DetailPage } from '../detail/detail';
import { LoginPage } from '../login/login';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  detail=DetailPage
  url="http://127.0.0.1:8080/"
  pno=0
  cList=[]
  newList=[]
  hotList=[]
  loadMore=[]
  constructor(
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private myHttp:HttpClient,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad IndexPage');
    //加载数据 index productmore两个接口
    var url="http://127.0.0.1:8080/index"
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result)
      var wids=[85,21,69,55,34,25,4,38,10]
      var caro=result.carousel.splice(3);
      for(var i=0;i<caro.length;i++){
        caro[i].wid=wids[i];
      };
      this.cList=caro;
      ///卡片区
      var cardpro=result.products.splice(0,39);
      //console.log(cardpro);
      for(var j=0;j<cardpro.length;j++){
        //console.log(cardpro[j].href);
        var str=cardpro[j].href.split("=")[1];
        cardpro[j].wid=str;
      };
      //console.log(cardpro);
      this.newList=cardpro;
      ////推荐商品
      var hpro=[];
      for(var p=10;p<19;p++){
       hpro.push(cardpro[p])
      }
      //console.log(hpro);
      this.hotList=hpro;
    });
    var npno=this.pno;
    this.productMore(npno);
   // console.log(loadData)
  }
  //加载更多的函数
  productMore(pno){
    var url="http://127.0.0.1:8080/productmore?pno="+pno;
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result);
      var arr=result.data.pics;
      var more=[];
      for(var i=0;i<arr.length-1;i++){
        if(arr[i].wid!=arr[i+1].wid){
          //console.log(arr[i].wid);
          more.push(arr[i].sm);
        }
      }
      more.push(arr[arr.length-1].sm);
      //console.log(more);
      var wines=result.data.wines;
      for(var j=0;j<wines.length;j++){
        wines[j].sm=more[j];
      }
      //console.log(wines)
      this.loadMore=this.loadMore.concat(wines);
    });
  }
  ///下拉加载更多数据
loadMoreproduct(myInfinite){
  var num=this.pno++;
  if(num>=24){
    num=1;
  };
  this.productMore(num);
  setTimeout(function(){myInfinite.complete();},2000)
}
///点击跳转到详情页
jumpDetail(wid){
  //console.log(wid);
  this.navCtrl.push(DetailPage,{wid:wid})
};
addcart(wid){
  var count=1;
  var url="http://127.0.0.1:8080/cart/add?wid="+wid+"&count="+count;
    this.myHttp.get(url,{withCredentials:true}).subscribe((result:any)=>{
      //console.log(result)
        if(result.code==1){
          var myAlert= this.alertCtrl.create({
            message:"添加成功",
            buttons:[
              {text:'确定'},
            ]
           });
           myAlert.present();
        }else{
          var myAlert= this.alertCtrl.create({
            message:"添加失败,请登录",
            buttons:[
              {text:'确定',handler:()=>{this.navCtrl.push(LoginPage)}},
              {text:'取消',handler:()=>{return;}}
            ]
           });
           myAlert.present();
        };
    
    })
     
}

}
