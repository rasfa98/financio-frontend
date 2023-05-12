import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  handleSubmit(): void {
    const data = this.loginForm.value;

    this.authService.login(data as LoginRequest).subscribe((res) => {
      this.authService.setToken(res.token);
      this.authService.setEmail(res.email);
      this.router.navigateByUrl('/dashboard');
    });
  }
}
