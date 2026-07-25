import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SuccessPopup } from '../../../shared/components/success-popup/success-popup';
import { PopupService } from '../../../shared/services/popup';
import { NumbersOnly } from '../../../shared/directives/numbers-only';

@Component({
  selector: 'app-otp-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuccessPopup,
    NumbersOnly
  ],
  templateUrl: './otp-signup.html',
  styleUrl: './otp-signup.css'
})
export class OtpSignup {

  firstName = '';
  lastName = '';


  mobile = '';
  otp = '';

  otpSent = false;

  errorMessage = '';
  successMessage = '';

  isLoading = signal(false);
  isLoadingVO = signal(false);


  countdown = signal(10);

  private timer: any;

  redirectToLogin = signal(false);

  constructor(
    private router: Router,
    private authService: AuthService,
    public popupService: PopupService  
  ) { }

  sendOtp(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.firstName ||
      !this.lastName ||
      !this.mobile) {
      this.errorMessage = 'Please enter all required fields';
      return;
    }

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobileRegex.test(this.mobile)) {
      this.errorMessage = 'Please enter valid mobile number';
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {

      this.isLoading.set(false);
      this.otpSent = true;
      this.successMessage = 'OTP sent successfully';
      this.startCountdown();

    }, 4000);

    // const payload={

    //   phone_number:this.mobile,

    // };

    // this.authService.sendOtp(payload).subscribe({

    //   next: (res) => {

    //     this.isLoading.set(false);
    //     this.otpSent = true;
    //     this.successMessage = 'OTP sent successfully';
    //     this.startCountdown();

    //   },

    //   error: (err) => {

    //     this.isLoading.set(false);
    //     this.errorMessage = 'Failed to send OTP';
    //     console.error(err);

    //   }

    // });

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

    // =============================
    // Call Verify OTP API Here
    // =============================
  
    const payload={

      first_name:this.firstName,
      last_name:this.lastName,
      phone_number:this.mobile,
      otp:this.otp

    };


    this.authService.verifyOtp(payload).subscribe({

      next: (res) => {

        this.isLoadingVO.set(false);

        this.otpSent = true;

        // this.successMessage = 'OTP sent successfully';

        this.redirectToLogin.set(true);
        this.popupService.success('Your phone number has been verified successfully.', 'OTP Verified');


      },

      error: (err) => {

        this.isLoadingVO.set(false);

        // this.errorMessage = 'Failed to send OTP';

        this.redirectToLogin.set(false);

        this.popupService.error(err?.error?.detail || 'Something went wrong. Please try again.', 'OTP Verification Failed');

        console.error(err);

      }

    });

  }

  closePopup(): void {

    this.popupService.close();
    if(this.redirectToLogin()) {
      this.router.navigate(['/login']);
    }
  }

  resendOtp(): void {

    if (this.countdown() > 0) {
      return;
    }

    this.sendOtp();
    // Call resend OTP API here

  }

  startCountdown(): void {

    this.countdown.set(10);

    clearInterval(this.timer);

    this.timer = setInterval(() => {

      if (this.countdown() >= 0) {

        this.countdown.update((val) => val - 1);

      } else {

        clearInterval(this.timer);

      }

    }, 1000);

  }

}