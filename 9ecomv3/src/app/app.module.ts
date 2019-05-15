import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Ecom9App } from './app.component';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AutoCompleteModule} from 'ionic2-auto-complete';
import { Database } from '../providers/database';
import { RootProvider } from '../providers/root/root';
import { UsersProvider } from '../providers/users/users';
import { CategoryProvider} from '../providers/category/category';
import { NativeStorage } from '@ionic-native/native-storage';
import { Order } from '../providers/order/order';
import { FiltersProvider } from '../providers/filters/filters';
import { ComponentsModule } from '../components/components.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { TranslatorProvider } from '../providers/translator/translator';
import { SearchProvider } from '../providers/search/search';
import { ProductProvider } from '../providers/product/product';
// import { NotificationCenterProvider } from '../providers/notification-center/notification-center';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    Ecom9App,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    AutoCompleteModule,
    IonicModule.forRoot(Ecom9App, {
      scrollPadding: false,
      scrollAssist: true, 
      autoFocusAssist: false,
      preloadModules: true,
      backButtonText: '',
      platforms: {
        ios: {
          
          statusbarPadding: true,
        },
        android: {
          statusbarPadding: true,
          
        }
      }
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide : TranslateLoader,
        useFactory : HttpLoaderFactory,
        deps : [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ecom9App,
    
  ],

  providers: [
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Database, 
    NativeStorage,
    RootProvider,
    UsersProvider,
    CategoryProvider,
    Order,
    FiltersProvider,
    TranslatorProvider,
    HttpClient,
    SearchProvider,
    ProductProvider,
    
  ]
})
export class AppModule {}
