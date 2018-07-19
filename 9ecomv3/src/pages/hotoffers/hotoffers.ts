import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category, Database } from '../../providers/database'; 
import { Storage } from "@ionic/storage";
/**
 * Generated class for the HotOffer page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hotoffers',
  templateUrl: 'hotoffers.html',
})
export class HotoffersPage { 
   
  public get_offers=[]; 

  public ReadyOffers : boolean = false;
  
  public Activenow : number = -1;

  menuItems: Category[];
  constructor(public storage : Storage ,  public navCtrl: NavController, public navParams: NavParams) {
    let db = Database.getInstance();
    this.menuItems = db.parentCategory();

    this.storage.get('offersData').then(data=>{ 

      this.get_offers = data; 
      console.log(data); 
      this.ReadyOffers = true;
    },err=>{

      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotoffersPage');
  } 
  
  categories(id: string) {
    this.menuItems.forEach(item => {
      if(item.id === id) {
        this.navCtrl.push('CategoriesPage', {menus: item, select: item.children[0].name.toLowerCase()});
      }
    })
  } 

  filter(category:any , Activenow = -1) 
  {
    console.log("khfjafha");
  }
}
