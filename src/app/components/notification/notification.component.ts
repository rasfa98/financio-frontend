import { Component, Input } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {
  Notification,
  NotificationType,
} from 'src/app/interfaces/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() notification: Notification | null = null;

  get notificationIcon(): IconProp {
    switch (this.notification?.type) {
      case NotificationType.SUCCESS:
        return faCheck;

      case NotificationType.ERROR:
        return faTriangleExclamation;

      default:
        return faCheck;
    }
  }
}
