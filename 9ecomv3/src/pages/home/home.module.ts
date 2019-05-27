import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../components/components.module';
import {AutoCompleteModule} from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    ComponentsModule,
    AutoCompleteModule,
    TranslateModule,
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}
