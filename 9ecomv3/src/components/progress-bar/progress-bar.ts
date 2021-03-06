import { Component,Input } from '@angular/core';

/**
 * Generated class for the ProgressVarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  @Input('progress') progress;
  text: string;

  constructor() {
    console.log('Hello ProgressBarComponent Component');
    this.text = 'Hello World';
  }

}
