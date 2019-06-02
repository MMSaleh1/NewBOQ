import { searchable } from './search/search';
import { Injectable } from '@angular/core';
import {Http}from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage}from '@ionic/storage';
import {Product} from './product/product';
import {Cart} from './cart/cart';
import { OrderData} from './order/order';
import { Address} from './users/users';
import { Category, Vendor } from './category/category';






//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////




/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  storage : Storage;
  categories: Category[];
 
  wishproducts: Product[];
  orders: OrderData[];
  cart: Cart;
  filterTypes: any[];
  vendors: Vendor[];

  products: Product[];
  //Addresses : Address[];
  //cities: string[];
  //district: string[];
 // countries: string[];
  //zipcodes: string[];
  searchItem : searchable[];
  http:Http;

  
  private static instance: Database = null;
  static isCreating: boolean = false;

  // Singleton
  constructor() {
    if (!Database.isCreating) {
      throw new Error(`You can't call new in Singleton instance!`)
    } else {

      this.categories = new Array<Category>();
      this.products = new Array<Product>();
      this.wishproducts = new Array<Product>();
      this.orders = new Array<OrderData>();
      this.filterTypes = new Array<any>();
      this.searchItem = new Array<searchable>();
      // this.cities = new Array<string>();
      // this.district = new Array<string>();
      // this.countries = new Array<string>();
      // this.zipcodes = new Array<string>();
      // this.vendors = new Array<Vendor>();
      this.initialize();
    }
  }

  static getInstance() {
    console.log('Database Provider');
    if (Database.instance === null) {
      Database.isCreating = true;
      Database.instance = new Database();
      Database.isCreating = false;
    }
    return Database.instance;
  }

  private initialize() {
    //console.log('Initialize Database');
    //this.countries.push('مصر');
    let now = new Date();
    let day = 24 * 60 * 60 * 1000;
    
    /*
    let id = 'SC' + (new Date(now.getTime() - 2*day)).getTime().toString();
    let date = new Date(now.getTime() - 2*day);
    let status = 'Dispatched';
    this.orders.push(new Order(id ,date , status ));

     id = 'SC' + (new Date(now.getTime() - 3*day)).getTime().toString();
     date = new Date(now.getTime() - 3*day);
     status = 'On Way';
    this.orders.push(new Order(id ,date , status ));

     id = 'SC' + (new Date(now.getTime() - 15*day)).getTime().toString();
     date = new Date(now.getTime() - 15*day);
     status = 'Delivered';
    this.orders.push(new Order(id ,date , status ));
  */
    
 
    
  }

  getCategoryById(id:any){
    for(let i= 0 ; i<this.categories.length ; i++ ){
      if(id==this.categories[i].id){
        return this.categories[i];
      }
    }
  }

  SaveAll(): void{
    let storage : Storage;
    this.storage = storage;
    // this.district != undefined && this.district.length > 0 ? this.storage.set('district',this.district): null;
    // this.cities != undefined && this.cities.length > 0 ? this.storage.set('cities',this.cities) : null ;
    // this.countries != undefined && this.countries.length > 0 ? this.storage.set('countries',this.countries) : null;
    // this.zipcodes != undefined && this.zipcodes.length > 0 ? this.storage.set('zipcodes',this.zipcodes) : null;
    this.filterTypes != undefined && this.filterTypes.length > 0 ? this.storage.set('fileterTypes',this.filterTypes) : null;
  }

  allFilters(): any {
    return this.filterTypes;
  }

  allCategory(): Category[] {
    return this.categories;
  }

 

  allWishList(): Product[] {
    //console.log(this.wishproducts);
    return this.wishproducts;
  }

  allOrders(): OrderData[] {
    return this.orders;
  }
  removeWish(wish: Product): void {
    var pos = -1;
    for (var i = 0; i < this.wishproducts.length; i++) {
      if (this.wishproducts[i] === wish) {
        pos = i;
      }
    }
    if (pos >= 0) {
      this.wishproducts.splice(pos, 1);
      wish.love = false;
    }
  }
  
  removeProductWish() {
    this.wishproducts.pop();
  }

  addWish(wish): void {
    this.wishproducts.push(wish);
    console.log(this.wishproducts);
  }

  // allCities(): string[] {
  //   return this.cities;
  // }

  // alldistrict(): string[] {
  //   return this.district;
  // }
  
  // allCountries(): string[] {
  //   return this.countries;
  // }

  // allZipCodes(): string [] {
  //   return this.zipcodes;
  // }

  

  



  //Delete only one single item from the cart 

  // delet_specific_item(prod : Product)
  // { 
  //   let pro = -1;
  //   for(let i = 0; i < this.products.length; i++)
  //   {
  //     if(this.products[i] === prod)
  //     {
  //       pro = i;
  //     } 
  //     if(pro >= 0)
  //     {
  //       this.products.splice(pro , 1);
  //     }
  //   }
  // }

  

  addOrder(order: OrderData) {
    this.orders.push(order); 
    console.log(order);
    // this.orders = this.orders.sort((a, b) => { return b.orderDate.getTime() - a.orderDate.getTime() });
  }

  parentCategory(): Category[] {
    var parents = this.categories.filter(item => {
      return item.parent === undefined;
    });
    
    parents.forEach(parent => {
      parent.children = new Array<Category>();
      this.categories.forEach(item => {
        if (item.parent == parent.id) {
          parent.children.push(item);
        }
      });
    });
    return parents;
  }

  allProduct(): Product[] {
    return this.products;
  }

  // categoryProducts(category: Category): Product[] {
  //   return category.children;
  // }

  
}
