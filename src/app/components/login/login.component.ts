import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/login';
import { NotificationType } from 'src/app/interfaces/notification';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  handleSubmit(): void {
    const data = this.loginForm.value;

    this.authService.login(data as LoginRequest).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.authService.setEmail(res.email);
        this.router.navigateByUrl('/dashboard');
      },
      error: () =>
        this.notificationService.showNotification({
          message: 'Email or password is incorrect',
          type: NotificationType.ERROR,
        }),
    });
  }
}
