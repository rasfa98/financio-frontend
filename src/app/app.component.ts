import { Component } from '@angular/core';
import { Notification } from './interfaces/notification';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  isAuthenticated: boolean = false;
  email: string = '';
  notification: Notification | null = null;

  ngOnInit(): void {
    this.authService.authObservable.subscribe((data) => {
      this.isAuthenticated = data.isAuthenticated;
      this.email = data.email;
    });

    if (this.authService.isAuthenticated()) {
      this.authService
        .getUser()
        .subscribe((user) => this.authService.setEmail(user.email));
    }

    this.notificationService.notificationObservable.subscribe({
      next: (notification) => (this.notification = notification),
    });
  }
}
