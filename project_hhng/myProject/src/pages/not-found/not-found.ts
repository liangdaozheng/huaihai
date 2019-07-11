import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotFoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  num=3
  times=null
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NotFoundPage');
  }
  ionViewWillEnter(){
    this.num=3;
    var num=3;
    this.times=setInterval(()=>{
      num--;
      this.num=num;
      if(num<0){this.num=0};
    },1000);
    setTimeout(()=>{clearInterval(this.times);this.navCtrl.parent.select(0)},3100);
  }

}
