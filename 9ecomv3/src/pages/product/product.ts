import { Component, ViewChild } from '@angular/core';
import {App, IonicPage, NavController, NavParams, Select, ModalController, PopoverController } from 'ionic-angular';
import { Product, Cart, Database } from '../../providers/database'
import { TabsPage } from '../tabs/tabs';
import { QuantitymodalPage } from '../quantitymodal/quantitymodal';

/**
 * Generated class for the Product page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  cb: boolean[] = [false, true, false, false, false]
  size: boolean[] = [false, true, false, false, false]
  public specific_item : any


  currentQty: string = 'Qty: 1';
  quantity: number = 1 ;
  currentColor: string;
  currentSize: string;
  hideIt: boolean = true;
  tabBarElement: any;
  product: Product;
  cart: Cart;
  db: Database;
  constructor(public popoverCtrl : PopoverController , public app : App , public navCtrl: NavController, public navParams: NavParams) {
   // this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.product = this.navParams.get('product');
    this.db = Database.getInstance();
    this.cart = Cart.getInstance();
    //this.cart.clear();
    this.specific_item = this.navParams.get('product');
    console.log(this.specific_item);
  /*
    if (this.product.colors.length > 0) {
      this.clearColor(1);
    }
    
    if (this.product.sizes.length > 0) {
      this.clearSize(1);
    }
    */
  }

  ionViewWillLeave() {
    //this.tabBarElement.style.display = 'flex';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    //this.tabBarElement.style.display = 'none';
  }

  clearColor(pos) {
    for (var i = 0; i < this.cb.length; i++) {
      if (i !== pos) {
        this.cb[i] = false;
      }
    }
    setTimeout(() => {
      this.cb[pos] = true;
      //this.currentColor = this.product.colors[pos];
    }, 200);
  }

  clearSize(pos) {
    for (var i = 0; i < this.size.length; i++) {
      if (i !== pos) {
        this.size[i] = false;
      }
    }
    this.size[pos] = true;
   // this.currentSize = this.product.sizes[pos];
  }

  loveIt() { 
    console.log("favorait icon is pressed")
    this.product.love = !this.product.love;
    setTimeout(() => {
      if(this.product.love) {
        this.db.addWish(this.specific_item)
      } else {
        this.db.removeProductWish();
      }
    }, 150);
    
  }
 
  
  quantityChange() {
    
    this.currentQty = 'Qty: ' + this.quantity.toString();
    console.log(this.quantity);

    //open modal 
    let quantitymodal = this.popoverCtrl.create(QuantitymodalPage , {'Quantity' : this.quantity }); 
    quantitymodal.present();
  }

  goCart() {
   this.app.getRootNav().setRoot(TabsPage,{"tabIndex":2})
  }

  add2Cart() { 
    let flgFound = false;
    this.cart.products.forEach(specific_item => {
      console.log(specific_item)

      if (specific_item.product != undefined && specific_item.product.id === this.product.id) {
        flgFound = true;
        specific_item.quantity = parseInt(specific_item.quantity.toString()) + parseInt(this.quantity.toString());
      }
      
    })
    
    if (!flgFound) {
      this.cart.products.push({ product: this.product, quantity: this.quantity });
    }
    setTimeout(() => {
      this.navCtrl.pop();
    }, 300);
  } 


}
