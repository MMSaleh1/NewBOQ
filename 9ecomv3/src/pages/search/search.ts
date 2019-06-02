import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Keyboard } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Category , CategoryProvider, Vendor} from '../../providers/category/category';
import { Product} from '../../providers/product/product';
import {ProductPage }from '../product/product';
import {Database} from '../../providers/database'; 
import { Cart } from '../../providers/cart/cart';
import { searchable } from '../../providers/search/search';

/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  resultsProd: any[];
  catsArr: Category[];
  allSearchable: Array<searchable>;
  allVendors:Array<Vendor>;
  mark: string;
  Ready: boolean;
  dataBase : Database;
  searchSegment:string="";
  cart : Cart;
  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public catProv : CategoryProvider

  ) { 
    this.mark="";
    this.Ready=false;
    this.cart = Cart.getInstance();
    this.dataBase =Database.getInstance();
    this.allSearchable = new Array();
    this.resultsProd = new Array();
    console.log(this.dataBase); 
    this.allSearchable = this.dataBase.searchItem;
    console.log(this.allSearchable);
    

  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad SearchPage');
  } 

  getItems(ev: any) {
    // Reset items back to all of the items
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string  list all items
    this.resultsProd = new Array();
    
   
    if (val && val.trim() != '') {
      this.mark = val;
     
      this.resultsProd = this.allSearchable.filter((item) => {
        console.log(item.name);
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

     
      console.log(this.resultsProd);
    } else {
      this.resultsProd = new Array();

    } 
    //console.log(this.allProduct.length);
  }

  allDataExist():boolean{
    return this.resultsProd.length == this.allSearchable.length ? true : false;
  }
  
  // decorateTitle(title: string): string {
  //   let regEx = new RegExp(this.mark, 'ig')
  //   let str = title.replace(regEx, `<span>${this.mark}</span>`);
  //   return str;
  // }

  toPage(prodid: any,pagelocation) {
    this.navCtrl.push(pagelocation, {id: prodid});
  }
 


}



