import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated: boolean = false;
  email: string = '';

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
  }
}
