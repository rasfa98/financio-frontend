import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/interfaces/notification';
import { RegisterRequest } from 'src/app/interfaces/register';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { confirmPassword } from 'src/app/shared/confirm-password.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: '',
    },
    { validators: confirmPassword }
  );

  handleSubmit(): void {
    const data = this.registerForm.value;

    this.authService.register(data as RegisterRequest).subscribe({
      next: () => {
        this.notificationService.showNotification({
          message: 'Account created',
          type: NotificationType.SUCCESS,
        });
        this.router.navigateByUrl('/login');
      },
      // TODO: Handle validation errors.
      error: () =>
        this.notificationService.showNotification({
          message: 'Account with emaiil already exists',
          type: NotificationType.ERROR,
        }),
    });
  }
}
