import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { SuccessPopup } from '../../../shared/components/success-popup/success-popup';
import { PopupService } from '../../../shared/services/popup';

@Component({
  selector: 'app-username-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuccessPopup
  ],
  templateUrl: './username-login.html',
  styleUrl: './username-login.css'
})
export class UsernameLogin implements OnInit {

  username = '';

  password = '';

  rememberMe = false;

  errorMessage = '';

  successMessage = '';

  isLoading = signal(false);

  showPassword = false;

  redirectToHome = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    public popupService: PopupService
  ) {}

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {

      this.router.navigate(['/home']);

    }

  }

  login(): void {

    this.errorMessage = '';

    this.successMessage = '';

    if (!this.username || !this.password) {

      this.errorMessage = 'Please enter Username and Password';

      return;

    }

    const payload = {

      username: this.username,

      password: this.password

    };

    this.isLoading.set(true);

    this.authService.userLogin(payload)
      .subscribe({

        next: (res: any) => {

          console.log('Login Success', res);

          this.isLoading.set(false);

          // Save user if required
          
          this.redirectToHome.set(true);

          this.popupService.success(

            res.message || 'Login Successful',

            'Welcome'

          );

        },

        error: (err) => {

          console.error(err);

          this.isLoading.set(false);

          this.redirectToHome.set(false);

          this.popupService.error(

            err?.error?.detail ||

            'Invalid Username or Password',

            'Login Failed'

          );

        }

      });

  }

  closePopup(): void {

    this.popupService.close();

    if (this.redirectToHome()) {

      this.router.navigate(['/home']);

    }

  }

  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }

}