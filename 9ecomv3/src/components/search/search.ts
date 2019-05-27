import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { SearchProvider }from '../../providers/search/search';
import { FormGroup, Validators, FormControl } from '@angular/forms'


/**
 * Generated class for the SearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {
  
  searchResult: FormGroup
  text: string;
  constructor(public SearchProv:SearchProvider,public navCtrl:NavController) {
    console.log('Hello SearchComponent Component');
    this.text = 'Hello World';
    
  }
  ngOnInit(): void {
    this.searchResult = new FormGroup({
      search: new FormControl('', [
        Validators.required
      ])
    })
  }
  public showSelected(data :any ) {
    console.log(data);
    let val = data.pageParameters;
   
    console.log(val);
    this.navCtrl.push(data.pageLocation,{'data' : val});
   
  }


}
