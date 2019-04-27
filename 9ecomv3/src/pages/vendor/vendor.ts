import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category, CategoryProvider, Vendor } from '../../providers/category/category';
import { Product } from '../../providers/product/product';
import { Database } from '../../providers/database';
import { Cart } from '../../providers/cart/cart';

/**
 * Generated class for the VendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html',
})
export class VendorPage {
  private db : Database;
  private allProduct : Array<Product>;
  public resultsProd :Array<Product>;
  private vendor : Vendor;
  private ready=false;
  private cart : Cart;

  constructor(public navCtrl: NavController, public navParams: NavParams , private catProv : CategoryProvider) {
    this.allProduct=new Array();
    this.resultsProd = new Array();
    this.cart = Cart.getInstance();
    this.db =Database.getInstance();
    this.vendor = this.navParams.get('vendor');
    console.log(this.vendor);
    this.getProducts(this.vendor.id);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorPage');
  }

  getProducts(vendorId:string="-1"){
    let searchCategories = this.db.categories;
    let products = new Array<Product>();
    for(let i = 0 ; i < searchCategories.length;i++){
      let tempArr = new Array<Product>();
      tempArr =this.catProv.getCateItem(searchCategories[i],tempArr);
      console.log(tempArr);
      products.push(...tempArr);
    }
    for(let i = 0 ; i<products.length;i++){
      if(products[i].distributerId == vendorId){
        this.allProduct.push(products[i]);
      }
    }
    this.resultsProd = this.allProduct;
    this.ready=true;
    console.log(this.allProduct);
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string  list all items
    this.resultsProd = new Array();
    //console.log(this.resultsProd.length);
   
    if (val && val.trim() != '') {
      this.resultsProd = this.allProduct.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      //console.log(this.resultsProd);
    } else {
      this.resultsProd = this.allProduct;
    } 
    //console.log(this.allProduct.length);
  }



  toProduct(prod: any) {
    this.navCtrl.push('ProductPage', {data: prod});
  }

  add2Cart(product:any) { 
    let flgFound = false;
    this.cart.products.forEach(specific_item => {
      //console.log(specific_item)

      if (specific_item.product != undefined && specific_item.product.id === product.id) {
        flgFound = true;
        specific_item.quantity = parseInt(specific_item.quantity.toString()) + 1;
      }
      
    })
    
    if (!flgFound) {
      this.cart.products.push({ product: product, quantity: 1 });
    }
  
  }
  hasCart(){
   
    return this.cart==undefined||this.cart.products.length==0 ? false : true;
 
 
}

placeOrder() {
  this.navCtrl.push('CheckoutPage');
}


  getProdQuant(id :any){
    if(this.cart != undefined){
      for(let i =0;i<this.cart.products.length;i++){
        if(id== this.cart.products[i].product.id){
          return this.cart.products[i].quantity;
        }
      }
    }
    
    return 0;
  }



}
