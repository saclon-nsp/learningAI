import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuccessPopup } from '../../../shared/components/success-popup/success-popup';
import { PopupService } from '../../../shared/services/popup';

@Component({
  selector: 'app-email-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuccessPopup
  ],
  templateUrl: './email-login.html',
  styleUrl: './email-login.css'
})
export class EmailLogin implements OnInit {

  email_Id = '';

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

    if (!this.email_Id || !this.password) {

      this.errorMessage = 'Please enter Email and Password';

      return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email_Id)) {

      this.errorMessage = 'Please enter a valid email address';

      return;

    }

    this.isLoading.set(true);

    const payload = {

      email: this.email_Id,

      password: this.password

    };

    this.authService.emailLogin(payload)
      .subscribe({

        next: (res: any) => {

          console.log('Email Login Success', res);

          this.isLoading.set(false);

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

            'Invalid Email or Password',

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