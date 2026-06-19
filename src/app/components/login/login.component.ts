import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CaptchaComponent } from '../captcha/captcha.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CaptchaComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  captchaValid = false;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onCaptchaValidation(isValid: boolean): void {
    this.captchaValid = isValid;
  }

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please enter valid email and password';
      return;
    }

    if (!this.captchaValid) {
      this.errorMessage = 'Please solve the captcha correctly';
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    const result = this.authService.login(email, password);

    if (!result.success) {
      this.errorMessage = result.message;
      this.isLoading = false;
      return;
    }

    this.successMessage = result.message;

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 1000);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}