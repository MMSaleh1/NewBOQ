import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams , PopoverController } from 'ionic-angular';
import { IonInfiniteScroll } from '@ionic/angular';



import { Category,CategoryProvider } from '../../providers/category/category';
import { Product , ProductProvider } from '../../providers/product/product';
import { ProductPage } from '../product/product';
import { Cart } from '../../providers/cart/cart';
import { CateListModalPage } from '../cate-list-modal/cate-list-modal';
import { Database } from '../../providers/database';

/**
 * Generated class for the SubCateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-cate-list',
  templateUrl: 'sub-cate-list.html',
})
export class SubCateListPage {

  category : Category;
  products: Array<Product>;
  mark="";
  results:Array<any>;
  listSelected:any;
  name="";
  route:Array<string>;
  ready:boolean = false;
  cart: Cart;
  hasProds:boolean= false;
  db: Database

  constructor(public navCtrl: NavController, public navParams: NavParams,public CateProv : CategoryProvider , public popoverCtrl : PopoverController , private prodProvider : ProductProvider) {
    if(this.navParams.get('data')!= undefined){
      this.category = this.navParams.get('data');
    }else{
      this.category = this.db.getCategoryById( this.navParams.get('id'));
     
    }

    this.name =this.category.name;
    this.results = new Array;
    this.listSelected='0';
    this.prodProvider.pagingProductCates(this.category.id,0,10).then(data=>{
      this.results= data;
      this.ready = true;
      if(this.results.length>0){
        this.hasProds =true;
      }
    });
    
    //this.products = new Array();
    //console.log(this.category);
    //this.products = this.CateProv.getCateItem(this.category,this.products);
    //console.log(this.products);
   
    
  }

  ionViewDidLoad() {
    this.cart = Cart.getInstance();
    this.route= new Array();
    let routers = new Array();
    routers = this.navParams.get('routes');
    if(routers == undefined){
      this.route.push(this.category.name);
    }else{
      this.route = routers
      this.route.push(this.category.name);
      }

    //console.log('ionViewDidLoad SubCateListPage');
  }
  ionViewDidEnter(){
  
    // if(this.route != undefined && this.route.length> 1 ){
    //   this.route.pop();
    // }
  }

  openSubCate(subCate : Category){
   // console.log(subCate);
    //console.log(subCate.children[0] instanceof Category );
   
      this.navCtrl.push(SubCateListPage,{'data': subCate , 'routes': this.route});
   
  }


  decorateTitle(title: string): string {
    let regEx = new RegExp(this.mark, 'ig')
    let str = title.replace(regEx, `<span>${this.mark}</span>`);
    return str;
  }

  toProduct(prod: Product) {
    this.navCtrl.push(ProductPage, {'data': prod });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string  list all items
    this.results = new Array();
    //console.log(this.results.length);
    
    this.fillData(val,this.products);

  
    //console.log(this.allProduct.length);
  }

  fillData(val,data:Array<any>){
    
    if (val && val.trim() != '') {
      this.mark = val;
      
      this.results = data.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      //console.log(this.results);
    } else {
      this.results = data;
    }
  }


  // changeListed(choise:number){
  //   if(this.category.children[0] instanceof Product && choise == 0 ){
  //   this.listSelected = -1;
  //   }else if(choise == 1){
  //     this.listSelected = choise;
  //     this.results = this.products;
  //   }else{
  //     this.listSelected = choise;
  //     this.results = this.category.children;
  //   }

  // }

  hasProduct(){
    return this.results==undefined||this.results.length==0 ?false : true;

  }


  hasCart(){
   
      return this.cart==undefined||this.cart.products.length==0 ? false : true;
   
   
  }

  placeOrder() {
    this.navCtrl.push('CheckoutPage');
  }


  scrollFunction($event){
    console.log($event);
    this.prodProvider.pagingProductCates(this.category.id,this.results[0].id,10).then(data=>{
      if(data.length == 0){
        $event.complete();
        this.hasProds=false

      }else{
        this.results.push(data);
        $event.complete();
      }
   
    })
  }



  add2Cart(product:any) { 
    // let flgFound = false;
    this.cart.addItem(product);
    // this.cart.products.forEach(specific_item => {
    //   //console.log(specific_item)

    //   if (specific_item.product != undefined && specific_item.product.id === product.id) {
    //     flgFound = true;
    //     specific_item.quantity = parseInt(specific_item.quantity.toString()) + 1;
    //   }
      
    // })
    
    // if (!flgFound) {
    //   this.cart.products.push({ product: product, quantity: 1 });
    // }
    
  
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


  openModal(){
    let cate ;
    let popover = this.popoverCtrl.create(CateListModalPage,{
      'cates' :  this.category.children
    },{ enableBackdropDismiss: true })
    popover.present();
    popover.onDidDismiss((data)=>{
      if(data != null){
        cate = data;
        this.openSubCate(cate);
      }
    
    })
  }


}
