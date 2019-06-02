import {AutoCompleteService} from 'ionic2-auto-complete';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Database} from '../database';
import { RootProvider } from '../root/root';
import { ProductPage } from '../../pages/product/product';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider{
  public  allSearchable:Array<searchable>;
  labelAttribute = "name";
  formValueAttribute ="";
  public db : Database;
  public getProductSearchActionController:string ="product/";
  public getProductSearchConnectionString:string ="get_products_name?"
  constructor(public http: HttpClient) {
    console.log('Hello SearchProvider Provider');
    this.db = Database.getInstance();
  }


  getSearchableDate():Promise<any>{
    let temp = `${RootProvider.APIURL4}${this.getProductSearchActionController}${this.getProductSearchConnectionString}`;
    //this.db = Database.getInstance();
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).subscribe((data:any[])=>{
        if(data == undefined || data.length == 0){
          resolve([])
        }else{
          let sProduct= new Array();
          for(let i=0;i<data.length;i++){
            sProduct.push(new searchable(data[i].Name,'ProductPage',data[i].Id))

          }
          resolve(sProduct);
        }
      })
    })

  }
  
  // setSearchbleData(){
  //   let db = Database.getInstance();
  //   this.allSearchable = new Array<searchable>();
  //   for(let i =0;i<db.categories.length;i++){
      
  //     this.allSearchable.push(new searchable(db.categories[i],'category','SubCateListPage',db.categories[i]))
  //     //pageParm.pop()
  //   }
  //   //pageParm.pop();
  //   return this.allSearchable;

  // }

  // addSearchable(Object:any,type:string,pageRedirect:any,pageParms:any){
  //   this.allSearchable.push(new searchable(Object,type,pageRedirect,pageParms));

  // }


  getResults(keyWord:string)
  {
    console.log(this.allSearchable.filter(item => item.name.toLowerCase().startsWith(keyWord.toLowerCase()) ));
    return this.allSearchable.filter(item => item.name.toLowerCase().startsWith(keyWord.toLowerCase()) )

  }
}

export class searchable{
  pageLocation: any;
  name: string ;
  id :string;
  constructor(name:string,pageLocation:any,id:any){
    this.name = name;
    this.pageLocation = pageLocation;
    this.id=id;
  }

}

// export class pageParms{
//   key:string;
//   val:any;
//   constructor(key:string,val:any){
//     this.key=key;
//     this.val=val;
//   }
//   public toJson(){
//     let str1 = this.key + " : " + JSON.stringify(this.val);
//     return JSON.stringify(str1);
//   }
// }
