
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides , Scroll } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Storage } from "@ionic/storage";
import { Category, CategoryProvider, Vendor } from '../../providers/category/category';
import { Database} from '../../providers/database';
import { SubCateListPage } from '../sub-cate-list/sub-cate-list';
import { TranslatorProvider } from '../../providers/translator/translator';
import { VendorPage } from '../vendor/vendor';



/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Scroll) scrollElement: Scroll;
  @ViewChild('vendorSlider') slides: Slides;
  tempRating:number=250;
  cCount:number = 80;
  adsSliders = [
    {
      image: 'assets/img/jotun.jpg',
      title: 'Flat <span>80%</span> off',
      description: 'on international brands',
      
    },
    {
      image: 'assets/img/elsewedy.png',
      title: 'Super Sale <span>50%</span> off',
      description: 'on international brands',
      
    }
  ];

  vendorSlider: any[][];
  categorySlider: any[][];
  selected : {item : any , Position : number};
  
  adsCount: number = 0;
  menuItems: Category[];
  
  dataBase : Database;
  //this variable is to get the all the categories with all items and all subcategories
  category_array : Array<Category>;
  vendorsArray : Array<Vendor>;
  viewNum:any;
  viewType:number=0;


  //this is a variable

  //this is a flag to show that the categories are ready to be loaded 
    ReadyProds : boolean = false; 
    prods: any;

  @ViewChild('sliders') slider: Slides;
  constructor(public storage : Storage 
    , public navCtrl: NavController
    , public navParams: NavParams
    , public catProv: CategoryProvider
    , private sanitizer: DomSanitizer
    , private trnasProv: TranslatorProvider

    

  ) {
    
    // getting all the categories saved in the storage
    this.dataBase = Database.getInstance();
    console.log(this.dataBase);
    this.category_array = new Array();
    this.vendorsArray =new Array();
    this.category_array = this.dataBase.categories;
    this.vendorsArray = this.dataBase.vendors;
    this.viewNum=0;
    console.log(this.category_array)
    console.log(this.vendorsArray);
    this.setVendors();
    this.setCategories();
    // this.catProv.getItemsNop().then(data=>{
    //   this.prods=data;
    //   this.ReadyProds=true;
    //   console.log(this.prods);
    // });
    // this.catProv.getCategoriesNop().then(data=>{
    //   console.log(data);
    // })
    console.log(this.tempRating);
    
    // this.categorySlider= new customSlider(this.category_array.slice(1,5),4,1);
    // this.vendorSlider = new customSlider(this.vendorsArray.slice(1,5),4,1);
    // console.log(this.categorySlider)
    /*
    this.smallAds.forEach(ads => {
      ads.forEach(item => {
        item.trustImage = this.sanitizer.bypassSecurityTrustStyle(item.image);
      });
    });
    let db = Database.getInstance();
    this.menuItems = db.parentCategory(); */
  } 
   
  

  ionViewDidEnter() {
    let input :any = document.getElementById("input").getElementsByTagName("INPUT");
     console.log(input);
     input[0].disabled=true;
    console.log(this.viewNum);

    // this variable is to get the subcategories, when the categoriespage is pushed , 
    // the subcategories is loaded as needed
    // var subcategories = this.navParams.get('subcat'); 

    // //Also this variable is needed to
    // var Category = this.navParams.get('categories');
    // if(subcategories !== undefined) {
    //   this.navParams.data.detail = undefined;
    //   this.navCtrl.push('CategoriesPage', {menus: Category, select: subcategories});
    // }
    
  }

  setVendors(){
    this.vendorSlider = new Array();
    let counter = 0;
    for(let i = 0;i<this.vendorsArray.length;i=i+2){
      this.vendorSlider[counter] = new Array();
      this.vendorSlider[counter][0]=this.vendorsArray[i];
      this.vendorSlider[counter][1]=this.vendorsArray[i+1];
      counter++;
    }
    console.log(this.vendorSlider);
  }

  setCategories(){
    this.categorySlider = new Array();
    let counter = 0;
    for(let i = 0;i<this.category_array.length;i=i+2){
      this.categorySlider[counter] = new Array();
      this.categorySlider[counter][0]=this.category_array[i];
      this.categorySlider[counter][1]=this.category_array[i+1];
      counter++;
    }
    console.log(this.categorySlider);
  }


  getImgContent(imageData: string):SafeUrl{
    return this.sanitizer.bypassSecurityTrustUrl(imageData);
}

  ionViewDidLoad() {
    this.viewNum='0';
    console.log('HomePage');
    //  this.OnInit();
  }

  public OnInit() {
    this.slides.effect = 'coverflow';
    this.slides.centeredSlides = true;
    this.slides.slidesPerView = 2;
    this.slides.spaceBetween = 15;
    
    this.slides.coverflow = {
      rotate: 0,
      stretch: 0,
      depth: 50,
      modifier: 1,
      slideShadows: false,
    }
  }
 
  /*
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    if (currentIndex < 6) {
      this.adsCount = currentIndex;
      console.log(currentIndex);
    }
    console.log(this.smallAds[this.adsCount][0]);
  } */

  categories(cate : Category) {
   // console.log(this.category_array);
   // console.log(id);
    this.navCtrl.push(SubCateListPage,{'data':cate})
  }

  // swipe(event, number)
  // {
    
  //   console.log(event.direction)
  //   if(event.direction == 2 || event.direction == 4 ){ // swipe left Or Right
  //     if(number == 0){
     
  //       this.categorySlider = this.changeSlider(this.categorySlider,this.category_array,event.direction);
  //       console.log(this.categorySlider);
  //     }else if(number == 1){
  //       this.vendorSlider = this.changeSlider(this.vendorSlider,this.vendorsArray,event.direction);
  //       console.log(this.vendorSlider);
  //     }

  //   }

  // }

  changeSlider(sliderObject:customSlider,mainArray:Array<any> ,direction : number){
    let newStartIndex =sliderObject.startIndex;
    let newLastIndex =newStartIndex+sliderObject.size;
    if(direction == 2) {//left
      newStartIndex =sliderObject.startIndex+sliderObject.size;
      newLastIndex =newStartIndex+sliderObject.size;
      if(newLastIndex > mainArray.length){
        
        newLastIndex = mainArray.length;
        newStartIndex = mainArray.length-4 >1 ? mainArray.length-4  : 1;
        console.log(mainArray.length);
        console.log(newStartIndex+" : "+newLastIndex);
      }
      sliderObject.addItems(mainArray.slice(newStartIndex,newLastIndex));
      sliderObject.startIndex = newStartIndex;

    }else if(direction == 4 ){
      newStartIndex =sliderObject.startIndex-sliderObject.size;
      newLastIndex =sliderObject.startIndex;
      if(newStartIndex < 1){
        newStartIndex =1;
        newLastIndex = newStartIndex+sliderObject.size;
        console.log(newStartIndex+" : "+newLastIndex);
      }
      sliderObject.addItems(mainArray.slice(newStartIndex,newLastIndex));
      sliderObject.startIndex = newStartIndex;
    }
    return sliderObject;
  }


  toSearchPage(){
    this.navCtrl.push('SearchPage');
  }
  vendor(item){
    console.log(item);
    this.navCtrl.push(VendorPage,{'vendor' : item});
  }
  changeView(){
    this.viewType = (this.viewType==0)? 1 : 0;
  }
  changelang(){
    this.trnasProv.switchLang();
  }

  }
  



class customSlider{
  items: Array<any>;
  size: number;
  startIndex: number;
  itemCol1: Array<any>;
  itemCol2: Array<any>;

  constructor(items:Array<any>,size:number,startindex:number){
    this.items = items;
    this.size= size;
    this.startIndex = startindex
    this.itemCol1 = new Array();
    this.itemCol2 = new Array();
    this.addItems(this.items);
  }

  addItems(items:Array<any>){
    this.items=items;
    this.itemCol1= this.items.slice(0,this.items.length/2);
    this.itemCol2= this.items.slice(this.items.length/2, this.items.length);
  }


  
  
}

  