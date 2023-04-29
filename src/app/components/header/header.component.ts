import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  faSignOut = faSignOut;

  @Input() isAuthenticated: boolean = false;

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
