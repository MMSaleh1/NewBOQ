import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneSignal} from '@ionic-native/onesignal/ngx';

/*
  Generated class for the NotificationCenterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationCenterProvider {
 private AppId: string ="5b981ba0-e17c-42e4-b6b9-e6e278c1f3ee";

constructor(private onesignal: OneSignal) { 
  this.onesignal.startInit(this.AppId);

this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.InAppAlert);

this.onesignal.handleNotificationReceived().subscribe(() => {
 // do something when notification is received
});

this.onesignal.handleNotificationOpened().subscribe(() => {
  // do something when a notification is opened
});

this.onesignal.endInit();

}


}
