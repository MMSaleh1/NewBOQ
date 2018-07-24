import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { Storage } from "@ionic/storage";
import { Category } from '../../providers/category/category';
import { Database} from '../../providers/database';
/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  adsSliders = [
    {
      image: 'assets/img/home/ads01.png',
      title: 'Flat <span>80%</span> off',
      description: 'on international brands',
      
    },
    {
      image: 'assets/img/home/ads02.png',
      title: 'Super Sale <span>50%</span> off',
      description: 'on international brands',
      
    },
    {
      image: 'assets/img/home/ads03.png',
      title: 'Crazy <span>65%</span> off',
      description: 'on international brands',
      
    },
    {
      image: 'assets/img/home/ads04.png',
      title: 'One <span>$</span> per item',
      description: 'on international brands',
      
    },
    {
      image: 'assets/img/home/ads05.png',
      title: 'Flat <span>99%</span> off',
      description: 'on international brands',
      
    },
    {
      image: 'assets/img/home/ads06.png',
      title: 'Ooh <span>69%</span> off',
      description: 'on international brands',
      
    }
  ];


  adsCount: number = 0;
  menuItems: Category[];
  
  dataBase : Database;
  //this variable is to get the all the categories with all items and all subcategories
  category_array = [];

  //this is a flag to show that the categories are ready to be loaded 
  //ReadyCats : boolean = false; 

  @ViewChild('sliders') slider: Slides;
  constructor(public storage : Storage , public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    
    // getting all the categories saved in the storage
    this.dataBase = Database.getInstance();
    console.log(this.dataBase);
    this.category_array = this.dataBase.allCategory();
    
    /*
    this.smallAds.forEach(ads => {
      ads.forEach(item => {
        item.trustImage = this.sanitizer.bypassSecurityTrustStyle(item.image);
      });
    });
    let db = Database.getInstance();
    this.menuItems = db.parentCategory(); */
  } 

  ionViewDidEnter() {
    var detail = this.navParams.get('subcat');
    var parent = this.navParams.get('category');
    if(detail !== undefined) {
      this.navParams.data.detail = undefined;
      this.navCtrl.push('CategoriesPage', {menus: parent, select: detail});
    }
  }

  ionViewDidLoad() {
    console.log('HomePage');
  }
 
  /*
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    if (currentIndex < 6) {
      this.adsCount = currentIndex;
      console.log(currentIndex);
    }
    console.log(this.smallAds[this.adsCount][0]);
  } */

  categories(id: string) {
   // console.log(this.category_array);
   // console.log(id);
    this.category_array.forEach(item => {
      if(item.id === id) {
        this.navCtrl.push('CategoriesPage', {'category': item, 'subcat': item.children[0]});
      }
    })
  } 
  
 

  /*
  getPrevious(){
    return this.navCtrl.getPrevious().component.navto(2)
  */

}
