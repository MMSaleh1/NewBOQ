import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController } from 'ionic-angular';
import { Storage} from '@ionic/storage';

import { Order} from '../../providers/order/order';
import { Database }from '../../providers/database';
import { User,UsersProvider } from '../../providers/users/users';
import {  CategoryProvider, Category } from '../../providers/category/category';
import { Product } from '../../providers/product/product';
import{SearchProvider} from '../../providers/search/search';
interface shopSlider {
  image: string;
}
/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  shopSliders: shopSlider[] = [
    {
      image: 'assets/img/welcome/welcome1.jpg',
    },
    {
      image: 'assets/img/welcome/welcome2.jpg',
    },
    {
      image: 'assets/img/welcome/welcome3.jpg',
    },
    {
      image: 'assets/img/welcome/welcome4.jpg',
    },
    {
      image: 'assets/img/welcome/welcome5.jpg',
    },
  ];
  public ready = false;
  public db : Database;
  public userData;
  public loadProgress = 0;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public menuCtrl : MenuController
    , public storage: Storage
    , public order: Order
    , public catProv : CategoryProvider
    , public userProv: UsersProvider
    , public searchProv: SearchProvider
  ) {
    this.menuCtrl.enable(false);
    this.db = Database.getInstance();
    this.loadProgress=30;
   this.getData();





    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  public async getData(){ 
      console.log("test");
    this.db.categories = await this.catProv.getCategoriesNop();
     
      console.log(this.db.categories);
      this.loadProgress=50;
      console.log(this.loadProgress);
      this.db.searchableObjects = this.searchProv.setSearchbleData();
      console.log(this.db.searchableObjects);
      this.ready = true;
      this.db.vendors = await this.catProv.getVendors();
      let data = await this.getUserData();
    console.log(data);
      if(data !=  undefined ){
        //console.log("test");
        this.userData = <User> data;
        User.getInstance(this.userData.id,this.userData.name,this.userData.password,this.userData.email,this.userData.gender,this.userData.phone,this.userData.fName,this.userData.lName,this.userData.addresses);
        //console.log(User.getInstance())
        this.loadProgress= this.loadProgress+ 30;
        console.log(this.loadProgress);
        
          this.db = Database.getInstance();
          this.userData.Addresses = await this.userProv.getAddress(this.userData.id);
          console.log(this.userData.Addresses);
           this.navCtrl.setRoot('TabsPage');

        
         /*
          this.order.getUserOrders(this.userData.id).then(data=>{
            this.loadProgress= this.loadProgress+ 20;
            console.log(this.loadProgress);
            this.db.orders = data;
           
          });
          */
          
          
        
      }else{
        console.log(this.loadProgress);
        this.loadProgress=100;
        this.navCtrl.setRoot('SigninPage');
      }

  }




  public async getUserData():Promise<any>{

    return new Promise((resolve)=>{
      this.storage.get('user').then(data=>{
        console.log(data)
        resolve(data);
        
      },err=>{
        resolve(undefined);
        console.log(err);
      })
    })
   
  }

  
}
