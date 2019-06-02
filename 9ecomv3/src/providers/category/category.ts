import { searchable } from './../search/search';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { RootProvider } from '../root/root';
import { subcategory } from '../sub-categories/sub-categories';
import { Product, ImageProcess, Specs } from '../product/product';
import { resolve } from 'path';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CategoryProvider {

  private productApiController: string = "product/";
  private productsActionString: string = "get_all_products?";

  private categoriesApiController: string = "maincategory/";
  private categoriesActionString: string = "get_main_category?";

  private subCategoriesApiController: string = "sub_category/"
  private subCategoriesActionString: string = "get_sub_category?"

  private vendorsApiController: string = "vendor/";
  private vendorActionString: string = "get_all_vendors?";


  constructor(public http: Http) {
    //console.log('Hello SubCategoriesProvider Provider');
  }


  public async getVendors(): Promise<any> {
    return new Promise((resolve) => {
      let temp = `${RootProvider.APIURL4}${this.vendorsApiController}${this.vendorActionString}`;
      this.http.get(temp).map(res => <any>res.json()).subscribe(data => {
        if(data == undefined || data.length == 0){
          resolve([]);
        }else{
          let vendors = new Array<Vendor>();
          for(let i = 0 ;i< data.length;i++){
            
            data[i].Deleted == false ? vendors.push(new Vendor(data[i].vendor_id,data[i].Name,data[i].Description,data[i].Deleted,data[i].PictureBinary,data[i].AltAttribute,data[i].TitleAttribute,data[i].IsNew,data[i].Email)) : '';
          }
          resolve(vendors);
        }
       

      });
    })
  }

  // public async getItemsNop(): Promise<any> {
  //   let comps = <Array<Vendor>> await this.getVendors();
  //   console.log(comps);
  //   return new Promise((resolve) => {
  //    // console.log(`${RootProvider.APIURL4}Product`);
  //     this.http.get(`${RootProvider.APIURL4}${this.productApiController}${this.productsActionString}product`).map(res => <any>res.json()).subscribe(data => {
  //       if (data == undefined || data.length == 0) {
  //         resolve([]);
  //       }
  //       else {
  //         let items: Product[] = new Array();
  //         //for(let i = 0 ; i < data.length ; i++){
  //         //  items[i] = new Product(data[i].item_name,data[i].item_id,data[i].item_type_id,data[i].item_img1,data[i].item_img2,data[i].inventory,data[i].measure_unit,data[i].item_long_desc,data[i].distributor_id,data[i].price ,data[i].offer_id , data[i].offer_name,data[i].discount_percentage,data[i].item_distributor_id,data[i].company_id);

  //         //}
  //         for (let i = 0; i < data.length; i++) {
  //           if(!data[i].Deleted){
  //             let specs = new Specs(data[i].Weight, data[i].Length, data[i].Height, data[i].Width);
  //             items.push(new Product(data[i].Name
  //               , data[i].Id
  //               , data[i].CategoryId
  //               , data[i].StockQuantity
  //               , specs
  //               , data[i].ShortDescription
  //               , data[i].VendorId
  //               , data[i].Price
  //               , data[i].FullDescription
  //               , data[i].ShowOnHomePage
  //               , data[i].AllowCustomerReviews
  //               , data[i].ApprovedRatingSum
  //               , data[i].NotApprovedRatingSum
  //               , data[i].IsShipEnabled
  //               , data[i].IsFreeShipping
  //               , data[i].AdditionalShippingCharge
  //               , data[i].DeliveryDateId
  //               , data[i].OrderMaximumQuantity
  //               , data[i].OrderMinimumQuantity
  //               , data[i].OldPrice
  //               , data[i].IsNew
  //               , data[i].MarkAsNewStartDateTimeUtc
  //               , data[i].MarkAsNewEndDateTimeUtc
  //               , data[i].PictureBinary
  //               , data[i].MimeType
  //               , data[i].rating
  //               , data[i].num_of_customers
  //             ))

  //           }
           
          
  //         }
  //         for(let i =0; i< items.length;i++)
  //         {
  //           for(let j = 0 ; j< comps.length;j++){
  //             if(items[i].distributerId == comps[j].id){
  //               items[i].company_name = comps[j].name;
  //             }
  //           }
  //         }          
  //         resolve(items);
  //       }
  //     })

  //   })

  // }



  public async getSubCategoriesNop(): Promise<any> {
   // let items = await this.getItemsNop();
   // console.log(items);
    return new Promise((resolve) => {
      this.http.get(`${RootProvider.APIURL4}${this.subCategoriesApiController}${this.subCategoriesActionString}`).map(res => <any>res.json()).subscribe(data => {
        if (data == null || data.length == 0) {
          resolve([]);
        }
        else {
          let subcat = new Array()
          for (let i = 0; i < data.length; i++) {
            let Subitems = new Array();
            if (data[i].Deleted == false) {
              // for (let j = 0; j < items.length; j++) {


              //   if (data[i].Id == items[j].product_subcat) {
              //     Subitems.push(items[j])
              //   }

              // }
              subcat.push(new Category(data[i].Name, data[i].Id, Subitems, data[i].PictureBinary, data[i].MimeType, data[i].ParentCategoryId, data[i].Deleted))

            }



          }

          for (let i = 0; i < subcat.length; i++) {
            let tempChildren = new Array();
            for (let j = 0; j < subcat.length; j++) {
              if (subcat[i].id === subcat[j].parent) {
                tempChildren.push(subcat[j])

              }
            }
            if (tempChildren.length > 0) {
              subcat[i].hasSubCates = true;
              subcat[i].children = new Array();
              subcat[i].children = tempChildren;
            }
          }
         // console.log(subcat);
          resolve(subcat);
          // console.log(subcat);

        }
      })
    })

  }

  public async getCategoriesNop(): Promise<any> {
    console.log("test2");
    let subcat = await this.getSubCategoriesNop();
    console.log(subcat);
    return new Promise((resolve) => {
      this.http.get(`${RootProvider.APIURL4}${this.categoriesApiController}${this.categoriesActionString}`).map(res => <any>res.json()).subscribe(data => {
        if (data == null || data.length == 0 || subcat.length == 0) {
          resolve([])
        }
        else {
          let catArray = new Array<Category>();
          for (let i = 0; i < data.length; i++) {
            let tempcats = new Array();
            if (data[i].Deleted == false) {
              for (let j = 0; j < subcat.length; j++) {

                if (data[i].Id == subcat[j].parent) {
                  tempcats.push(subcat[j]);

                  //console.log(tempcats);
                }

              }
              catArray.push(new Category(data[i].Name, data[i].Id, tempcats, data[i].PictureBinary, data[i].MimeType, data[i].ParentCategoryId, data[i].Deleted, true))

            }

          }
         // console.log(catArray);

          resolve(catArray);
          // this.storage.set("appData", this.catArray);

        }
      })
    })

  }



  getCateItem(cate: Category, products: Array<Product>): Product[] {
    if (cate.hasSubCates) {
     // console.log(cate);
      for (let i = 0; i < cate.children.length; i++) {
        this.getCateItem(cate.children[i], products);
      }
      return products;

    } else {
      products.push(...<Array<Product>>cate.children);
      return products
    }

  }

  getSearchableCategories(categories:Array<Category>){
    let searchableCats = new Array<searchable>();
    for(let i =0 ; i<categories.length; i++){
      searchableCats.push(new searchable(categories[i].name,'SubCateListPage',categories[i].id))
    }
    return searchableCats;

  }

}



export class Category {




  parentShow?: boolean = false;
  image: String;
  open: boolean;

  //////////////////////////////////////////
  id: string;
  name: string;
  parent?: string;
  children?: any[];
  hasSubCates: boolean;
  deleted: boolean;
  constructor(name: string = "", id: string = "", children: any, NewsCategoryImage: string = "", MimeType: string, Parent: string = "", deleted: boolean, hasSubCate: boolean = false) {
    this.name = name;
    this.id = id;
    this.image = ImageProcess.stringToImage(NewsCategoryImage, MimeType);
    this.parentShow = false;
    this.parent = Parent;
    this.open = false;
    this.deleted = deleted;
    this.children = children ? children : new Array();
    this.hasSubCates = hasSubCate;
  }



}

export class Vendor {

  id: string;
  email: string;
  deleted: boolean;
  image: string;
  altAttribute: string;
  titleAttribute: string;
  isNew: boolean;
  name: string;
  catID: string;
  descr: string;
  constructor(id:string
    ,name: string
    , descrpition: string
    , deleted: boolean
    , pictureBinary: string
    , AltAttribute: string
    , titleAttribute: string
    , isNew: boolean
    , email: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.descr = descrpition;
    this.deleted = deleted;
    this.image = ImageProcess.stringToImage(pictureBinary, "image/jpeg");
    this.altAttribute = AltAttribute;
    this.titleAttribute = titleAttribute;
    this.isNew = isNew;
    this.catID="";
  }
}


