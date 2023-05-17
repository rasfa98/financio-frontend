import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  private notificationSubject = new Subject<Notification | undefined>();

  public readonly notificationObservable =
    this.notificationSubject.asObservable();

  showNotification(notification: Notification) {
    this.notificationSubject.next(notification);

    setTimeout(() => {
      this.hideNotification();
    }, notification.duration || 3000);
  }

  hideNotification() {
    this.notificationSubject.next(undefined);
  }
}
