import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsernameLogin } from './username-login/username-login';
import { EmailLogin } from './email-login/email-login';
import { OtpLogin } from './otp-login/otp-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UsernameLogin,
    EmailLogin,
    OtpLogin
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  selectedLogin: 'username' | 'email' | 'otp' = 'username';

  changeLogin(type: 'username' | 'email' | 'otp'): void {
    this.selectedLogin = type;
  }

}