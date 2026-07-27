import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css']
})
export class AppHeader {

  @Input() title = 'Society Management Hub';

  constructor(private router: Router, public authService: AuthService) {}

  goHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}