import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SuccessPopup } from '../../../shared/components/success-popup/success-popup';
import { PopupService } from '../../../shared/services/popup';

@Component({
  selector: 'app-otp-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuccessPopup
  ],
  templateUrl: './otp-login.html',
  styleUrl: './otp-login.css'
})
export class OtpLogin {

  mobile = '';
  otp = '';

  otpSent = false;

  errorMessage = '';
  successMessage = '';

  isLoading = signal(false);
  isLoadingVO = signal(false);

  countdown = signal(10);

  private timer: any;

  redirectToHome = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    public popupService: PopupService
  ) {}

  sendOtp(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.mobile) {

      this.errorMessage = 'Please enter your mobile number';
      return;

    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(this.mobile)) {

      this.errorMessage = 'Please enter a valid mobile number';
      return;

    }

    this.isLoading.set(true);

    // Dummy API

    setTimeout(() => {

      this.isLoading.set(false);

      this.otpSent = true;

      this.successMessage = 'OTP sent successfully';

      this.startCountdown();

    }, 4000);

    /*
    // Actual API

    const payload = {

      phone_number: this.mobile

    };

    this.authService.sendOtp(payload).subscribe({

      next: (res) => {

        this.isLoading.set(false);

        this.otpSent = true;

        this.successMessage = res.message;

        this.startCountdown();

      },

      error: (err) => {

        this.isLoading.set(false);

        this.popupService.error(
          err?.error?.detail || 'Failed to send OTP',
          'OTP Failed'
        );

      }

    });
    */

  }

  verifyOtp(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.otp) {

      this.errorMessage = 'Please enter OTP';
      return;

    }

    if (this.otp.length !== 6) {

      this.errorMessage = 'OTP must be 6 digits';
      return;

    }

    this.isLoadingVO.set(true);

    // Dummy API

    setTimeout(() => {

      this.isLoadingVO.set(false);

      this.redirectToHome.set(true);

      this.popupService.success(
        'Login Successful',
        'Welcome Back'
      );

    }, 4000);

    /*
    // Actual API

    const payload = {

      phone_number: this.mobile,
      otp: this.otp

    };

    this.authService.verifyLoginOtp(payload).subscribe({

      next: (res) => {

        this.isLoadingVO.set(false);

        if(res.token){

          sessionStorage.setItem('token', res.token);

        }

        if(res.user){

          sessionStorage.setItem(
            'user',
            JSON.stringify(res.user)
          );

        }

        this.redirectToHome.set(true);

        this.popupService.success(
          res.message || 'Login Successful',
          'Welcome Back'
        );

      },

      error: (err) => {

        this.isLoadingVO.set(false);

        this.redirectToHome.set(false);

        this.popupService.error(
          err?.error?.detail || 'Invalid OTP',
          'Login Failed'
        );

      }

    });
    */

  }

  resendOtp(): void {

    if (this.countdown() > 0) {

      return;

    }

    this.sendOtp();

  }

  startCountdown(): void {

    this.countdown.set(10);

    clearInterval(this.timer);

    this.timer = setInterval(() => {

      if (this.countdown() > 0) {

        this.countdown.update(value => value - 1);

      } else {

        clearInterval(this.timer);

      }

    }, 1000);

  }

  closePopup(): void {

    this.popupService.close();
    debugger;
    if (this.redirectToHome()) {
      this.authService.isLoggedIn.set(true);
      this.router.navigate(['/home']);

    }

  }

}