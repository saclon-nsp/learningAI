import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsernameSignup } from './username-signup/username-signup';
import { EmailSignup } from './email-signup/email-signup';
import { OtpSignup } from './otp-signup/otp-signup';
import { GoogleSignup } from './google-signup/google-signup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UsernameSignup,
    EmailSignup,
    OtpSignup,
    GoogleSignup
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {

  selectedSignup = 'username';

  changeSignup(type: string) {
    this.selectedSignup = type;
  }

}