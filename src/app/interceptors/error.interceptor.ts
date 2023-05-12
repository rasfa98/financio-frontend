import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationType } from '../interfaces/notification';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401].includes(err.status) && this.authService.isAuthenticated()) {
          this.router.navigateByUrl('/login');
          this.authService.logout();

          this.notificationService.showNotification({
            message: 'Session expired',
            type: NotificationType.ERROR,
          });
        }

        const error = err.error?.message || err.statusText;

        console.error(err);

        return throwError(() => error);
      })
    );
  }
}
