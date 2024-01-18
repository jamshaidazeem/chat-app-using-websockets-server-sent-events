import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebNotificationService {
  constructor() {}

  public askNotificationPermission = () => {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
    } else {
      Notification.requestPermission().then(
        (permission: NotificationPermission) => {
          // console.log('🚀 ~ WebNotificationService ~ permission:', permission);
        }
      );
    }
  };

  get areNotificationsPermissionRequested() {
    return Notification.permission !== 'default' ? true : false;
  }

  get areNotificationsPermissionGranted() {
    return Notification.permission === 'granted' ? true : false;
  }
}
