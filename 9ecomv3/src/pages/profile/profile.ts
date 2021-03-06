import { Component, ViewChild } from '@angular/core';
import {App, IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { Storage} from '@ionic/storage';
import { Database } from '../../providers/database';
import { Cart,CartProduct} from '../../providers/cart/cart';
import { User , Address ,UsersProvider} from '../../providers/users/users';
import { Product } from '../../providers/product/product';
import { OrderData } from '../../providers/order/order';
/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage { 

  u : any;
  tabs: IScrollTab[] = [
    {
      name: 'Profile',
      selected: true
    },
    {
      name: 'My orders',
    },
    {
      name: 'Wishlist',
    },
    {
      name: 'Saved Address',
    },
  ]; 

  quantity : number = 1;
  selectedTab: IScrollTab;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  db: Database;
  savedAddresses: Address[];
  wishProducts: Product[]; 
  userarray : any =  [];
  orders: OrderData[];
  cart: Cart; 
  user : User;
  
  // this a flag to show the user is exists or not to show his data in the profile
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private menu: MenuController
    , public userProv : UsersProvider
    , public storage: Storage
    , public app: App
  ) {
    this.selectedTab = this.tabs[0];
    this.db = Database.getInstance();
    this.cart = Cart.getInstance();
    this.user = this.userProv.getUser();
    this.savedAddresses = this.user.addresses;
    this.wishProducts = this.db.allWishList(); 
    this.orders = this.db.allOrders();  
    console.log(this.user);
    
  }

  /*  
  ionViewDidEnter() {
    this.menu.swipeEnable(false, 'ecom9');
    var detail = this.navParams.get('user');
    console.log(detail);
    if (detail) {
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].name.toLowerCase() === detail.toLowerCase()) {
          this.scrollTab.go2Tab(i);
          this.navParams.data.detail = undefined;
        }
      }
    }
  }
  */

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
  }

  swipeEvent($e) {
    //console.log('before', $e.direction);
    switch ($e.direction) {
      case 2: // left
        this.scrollTab.nextTab();
        break;
      case 4: // right
        this.scrollTab.prevTab();
        break;
    }
  }

  editAddress(addr: Address) {

  }

  removeAddress(addr: Address) {
    this.userProv.removeAddress(addr);
  }

  add2Cart(wish: Product) {
    let cp: CartProduct;
    cp = {
      product: wish,
      quantity: 1,
     // color: wish.color,
     // size: wish.size,
    };
    let flgFound = false;
    console.log(wish);
    this.cart.products.forEach(Wish => {
      if (Wish.product.id === cp.product.id) {
        flgFound = true;   
        if(Wish.quantity >= wish.quant) 
        {
          Wish.quantity = wish.quant;
          cp.quantity = 0;
        }else if(Wish.quantity < 0) 
        {
          Wish.quantity = 0; 
        }
        
       
        Wish.quantity = parseInt(Wish.quantity.toString()) + parseInt(cp.quantity.toString());
      }
    })
    if (!flgFound) {
      this.cart.products.push(cp);  
    } 
    
  }

  removeWish(wish: Product) {
    this.db.removeWish(wish);
  }
  signOut(){
      this.storage.remove('user');
      if(this.app.getActiveNavs()!= undefined &&this.app.getActiveNavs().length >0)
      {
        const root = this.app.getRootNavs()[0];
        root.setRoot('SigninPage')
        root.popToRoot();
       
      }
     
  }
}
