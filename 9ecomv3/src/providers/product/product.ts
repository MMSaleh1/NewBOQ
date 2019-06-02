import { Database } from './../database';
import { Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { RootProvider } from '../root/root';
import { Category } from '../category/category';
import { CartProduct } from '../cart/cart';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider extends RootProvider {
  private productAPiController:string ='product/';
  private getReviewsActionString: string ='get_comments?';

  private getProductByIdActionString: string ="get_product_byid/";

  private getShippingPriceController:string = 'shipping/';
  private getShippingPriceActionString:string = 'shipping_by_weight?';

  private getProductPagingController:string = "product_paging/";
  private getProductCatePagingActionString:string= "get_product_page_by_cat?";
  private getProductVendPagingActionString:string= "get_product_page_by_vendor?";

  constructor(public http: Http) {
    super(http);
  }

  public weightRatio(width:number,height:number,length:number,weight : number){
    let weightRatio =  ((width*height*length)/200) ;
    console.log(weightRatio);
    return weightRatio > weight ? Math.round(weightRatio) : Math.round(weight) ;

  }

  public async getSgippingPrice(products:CartProduct[]):Promise<any>{
    let wRatio = 0 ;
    for(let i =0 ; i<products.length; i++){
      wRatio += this.weightRatio(products[i].product.specs.width,products[i].product.specs.height,products[i].product.specs.length,products[i].product.specs.weight);
      console.log(wRatio);
    }
    
    let temp = `${RootProvider.APIURL4}${this.getShippingPriceController}${this.getShippingPriceActionString}weight=${wRatio}`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
      console.log(data);
      resolve(data);
    })
  });
  
  }


  getReviews(prodId:string):Promise<any>{
    let temp = `${RootProvider.APIURL4}${this.productAPiController}${this.getReviewsActionString}ProductId=${prodId}`;
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        if(data != null && data.length >0){
          let reviews = new Array<review>();
          for(let i = 0 ; i< data.length;i++){
            reviews.push(new review(data[i].Username,data[i].ReviewText,data[i].Title,data[i].CreatedOnUtc));
          }
          resolve(reviews)
        }else{
          resolve([])
        }
      },err=>{
        console.log(err);
        resolve([])
      })
    })

  }
  public getproductById(prodId: any):Promise<any>{
    let temp = `${RootProvider.APIURL4}${this.productAPiController}${this.getProductByIdActionString}${prodId}`;
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        if(data == null || data.length == 0){
          resolve([])
        }else{
            let specs = new Specs(data[0].Weight, data[0].Length, data[0].Height, data[0].Width);
            let prod = new Product(data[0].Name
              , data[0].Id
              , data[0].CategoryId
              , data[0].StockQuantity
              , specs
              , data[0].ShortDescription
              , data[0].VendorId
              , data[0].Price
              , data[0].FullDescription
              , data[0].ShowOnHomePage
              , data[0].AllowCustomerReviews
              , data[0].ApprovedRatingSum
              , data[0].NotApprovedRatingSum
              , data[0].IsShipEnabled
              , data[0].IsFreeShipping
              , data[0].AdditionalShippingCharge
              , data[0].DeliveryDateId
              , data[0].OrderMaximumQuantity
              , data[0].OrderMinimumQuantity
              , data[0].OldPrice
              , data[0].IsNew
              , data[0].MarkAsNewStartDateTimeUtc
              , data[0].MarkAsNewEndDateTimeUtc
              , data[0].PictureBinary
              , data[0].MimeType
              , data[0].rating
              , data[0].num_of_customers
            )
          resolve(prod)
        }
      })
    })
    
  }

  //Product Paging (Categories Based)
  public pagingProductCates(catId:string,prodLastId:number =0, prodCount:number = 10) : Promise<any>{
    let db = Database.getInstance();
    let comps = db.vendors;
    let temp = `${RootProvider.APIURL4}${this.getProductPagingController}${this.getProductCatePagingActionString}product_num=${prodCount}&last_id=${prodLastId}&cat_id=${catId}`
    console.log(temp);
    return new Promise((resolve)=>{
      this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
        if (data == undefined || data.length == 0) {
          resolve([]);
        }
        else {
          let items: Product[] = new Array();
          //for(let i = 0 ; i < data.length ; i++){
          //  items[i] = new Product(data[i].item_name,data[i].item_id,data[i].item_type_id,data[i].item_img1,data[i].item_img2,data[i].inventory,data[i].measure_unit,data[i].item_long_desc,data[i].distributor_id,data[i].price ,data[i].offer_id , data[i].offer_name,data[i].discount_percentage,data[i].item_distributor_id,data[i].company_id);
  
          //}
          for (let i = 0; i < data.length; i++) {
            if(!data[i].Deleted){
              let specs = new Specs(data[i].Weight, data[i].Length, data[i].Height, data[i].Width);
              items.push(new Product(data[i].Name
                , data[i].Id
                , data[i].CategoryId
                , data[i].StockQuantity
                , specs
                , data[i].ShortDescription
                , data[i].VendorId
                , data[i].Price
                , data[i].FullDescription
                , data[i].ShowOnHomePage
                , data[i].AllowCustomerReviews
                , data[i].ApprovedRatingSum
                , data[i].NotApprovedRatingSum
                , data[i].IsShipEnabled
                , data[i].IsFreeShipping
                , data[i].AdditionalShippingCharge
                , data[i].DeliveryDateId
                , data[i].OrderMaximumQuantity
                , data[i].OrderMinimumQuantity
                , data[i].OldPrice
                , data[i].IsNew
                , data[i].MarkAsNewStartDateTimeUtc
                , data[i].MarkAsNewEndDateTimeUtc
                , data[i].PictureBinary
                , data[i].MimeType
                , data[i].rating
                , data[i].num_of_customers
              ))
  
            }
           
          
          }
          for(let i =0; i< items.length;i++)
          {
            for(let j = 0 ; j< comps.length;j++){
              if(items[i].distributerId == comps[j].id){
                items[i].company_name = comps[j].name;
              }
            }
          }          
          resolve(items);
        }
      })

    })
   
  
  }



    //Product Paging (Vendor Based)
    public pageProductVendor(vendorId:string,prodLastId:string ='0', prodCount:number = 10):Promise<any>{
      let db = Database.getInstance();
      let comps = db.vendors;
      let temp = `${RootProvider.APIURL4}${this.getProductPagingController}${this.getProductVendPagingActionString}product_num=${prodCount}&last_id=${prodLastId}&vendor_id=${vendorId}`
      return new Promise((resolve)=>{
        this.http.get(temp).map(res=><any>res.json()).subscribe(data=>{
          if (data == undefined || data.length == 0) {
            resolve([]);
          }
          else {
            let items: Product[] = new Array();
            //for(let i = 0 ; i < data.length ; i++){
            //  items[i] = new Product(data[i].item_name,data[i].item_id,data[i].item_type_id,data[i].item_img1,data[i].item_img2,data[i].inventory,data[i].measure_unit,data[i].item_long_desc,data[i].distributor_id,data[i].price ,data[i].offer_id , data[i].offer_name,data[i].discount_percentage,data[i].item_distributor_id,data[i].company_id);
    
            //}
            for (let i = 0; i < data.length; i++) {
              if(!data[i].Deleted){
                let specs = new Specs(data[i].Weight, data[i].Length, data[i].Height, data[i].Width);
                items.push(new Product(data[i].Name
                  , data[i].Id
                  , data[i].CategoryId
                  , data[i].StockQuantity
                  , specs
                  , data[i].ShortDescription
                  , data[i].VendorId
                  , data[i].Price
                  , data[i].FullDescription
                  , data[i].ShowOnHomePage
                  , data[i].AllowCustomerReviews
                  , data[i].ApprovedRatingSum
                  , data[i].NotApprovedRatingSum
                  , data[i].IsShipEnabled
                  , data[i].IsFreeShipping
                  , data[i].AdditionalShippingCharge
                  , data[i].DeliveryDateId
                  , data[i].OrderMaximumQuantity
                  , data[i].OrderMinimumQuantity
                  , data[i].OldPrice
                  , data[i].IsNew
                  , data[i].MarkAsNewStartDateTimeUtc
                  , data[i].MarkAsNewEndDateTimeUtc
                  , data[i].PictureBinary
                  , data[i].MimeType
                  , data[i].rating
                  , data[i].num_of_customers
                ))
    
              }
             
            
            }
            for(let i =0; i< items.length;i++)
            {
              for(let j = 0 ; j< comps.length;j++){
                if(items[i].distributerId == comps[j].id){
                  items[i].company_name = comps[j].name;
                }
              }
            }          
            resolve(items);
          }
        })
      })
      
    }

  

}


export class Product {

  
  image2 ? : string;  
  
  measure_u? : string;
  distributerLinkId: string;
  discountPercentage:number;
//////////////////////////////
  
  discount: number = 0;
  image: string; 
  
  //colors: string[];
  //sizes: string[];
  //descriptions: string[];
  categories: Category[]; 
  company_id: string;
  love?: boolean = false;
  status?: string; 
  offer_id : string; 
  offer_name : string; 


  /////////////////////////////////
  id: string; //
  name: string; //
  product_subcat ? : number;//
  description? : string;//
  longDescription: string;//
  distributerId : string;//
  showOnHome: boolean;//
  //metaKeywords: string;
  allowCustomerReviews: boolean;//
  approvedRatingSum: number;//
  notApprovedRattingSum: number;//
  isShipEnabled: boolean;//
  isFreeShipping:boolean;//
  additionalShippingCharge: number;//
  DeliveryDateId: string;//
  quant ? : number;//
  orderMaxQuant: number;//
  orderMinQuant: number;//
  price: number;//
  currentPrice: number;//
  isNew: boolean;//
  newFromUTC: Date;
  newToUTC:Date;
  image1 ? : string;//
  specs: Specs//
  company_name : string;//
  rating: number ; //
  customerCount: number;//

   constructor(prod_name : string
    , itemId : string
    , prod_sub_category : number
    , quantity : number
    , specs : Specs
    , prod_desc : string
    , distributorId : string
    , price : number
    , longDesc: string
    , showOnHome:boolean
    , allaCustomerReview:boolean
    , approvedRatingSum:number
    , notApprovedRattingSum:number
    , isShipEnabled: boolean
    , isFreeShipping:boolean
    , additionalShippingCharge:number
    , DeliveryDateId:string
    , orderMaxQuant:number
    , orderMinQuant:number
    , oldPrice:number
    , New:boolean
    , newFromUTC: Date
    , newToUTC:Date
    , prod_image1 : string
    , imageMimeType:string
    , rating:number
    , customerCount:number
  ) { 
   
    
    
//////////////////////////////////////////////


    this.id = itemId; 
    this.name = prod_name;
    this.description = prod_desc; 
    this.specs =specs;
    this.image1 = ImageProcess.stringToImage(prod_image1,imageMimeType); //'assets/img/categories/girl/jewellery/jewellery01.jpg';
    this.quant = quantity;
    this.distributerId = distributorId;
    this.product_subcat = prod_sub_category;
    this.currentPrice=price;
    this.longDescription=longDesc;
    this.showOnHome=showOnHome;
    this.allowCustomerReviews=allaCustomerReview;
    this.approvedRatingSum=approvedRatingSum;
    this.notApprovedRattingSum=notApprovedRattingSum;
    this.isShipEnabled=isShipEnabled;
    this.isNew=New;
    this.isFreeShipping=isFreeShipping;
    this.additionalShippingCharge=additionalShippingCharge;
    this.DeliveryDateId=DeliveryDateId;
    this.orderMaxQuant=orderMaxQuant;
    this.orderMinQuant=orderMinQuant;
    this.newFromUTC=newFromUTC;
    this.newToUTC=newToUTC;
    this.price=oldPrice;
    this.rating = (rating == null)? 0 : rating;
    this.customerCount = customerCount;



  }
}


export class Specs{
  weight: number;
  length: number;
  height: number;
  width: number;
  additionalSpecs: Array<specialSpecs>;
  constructor(weight:number,length:number,height:number,width:number,additonalSpecs:Array<specialSpecs>=new Array()){
    this.weight=weight;
    this.length=length;
    this.height=height;
    this.width=width;
    this.additionalSpecs=new Array();
    this.additionalSpecs=additonalSpecs;
  }
  
}

export class specialSpecs{
  name:string;
  val:any;
}

export class ImageProcess{

  constructor(){

  }

  static stringToImage(imageData:string,mimeType:string,base:string="base64"):string{
    return "data:"+mimeType+";"+base+","+imageData;
  }
}

export class review{
  writerName:string;
  reviewTitle: string;
  reviewBody:string;
  creationDate:Date;
  constructor(wName:string,rTitle:string,rBody:string,date:Date){
    this.writerName = wName;
    this.reviewTitle = rTitle;
    this.reviewBody = rBody;
    this.creationDate = date;
  }

}




