import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/interfaces/register';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router
  ) {}

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: confirmPassword }
  );

  handleSubmit(): void {
    const data = this.registerForm.value;

    this.authService.register(data as RegisterRequest).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
