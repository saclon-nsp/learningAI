import { Component, OnInit, signal } from '@angular/core';
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
import { finalize } from 'rxjs/operators';


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
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // auto redirect if already logged in
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
      this.errorMessage = 'Enter valid email and password';
      return;
    }

    if (!this.captchaValid) {
      this.errorMessage = 'Captcha validation failed';
      return;
    }

    const { email, password } = this.loginForm.value;

    // 🔥 SET LOADER FIRST (outside observable)
    this.isLoading.set(true);

    this.authService.login(email, password).subscribe({

      next: (res: any) => {
        debugger;

        this.isLoading.set(false); // 🔥 stop immediately

        if (!res?.success) {
          this.errorMessage = res?.message || 'Invalid credentials';
          return;
        }

        this.successMessage = 'Login successful';

        if (res.token) {
          sessionStorage.setItem('token', res.token);
        }

        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        debugger;

        this.isLoading.set(false); // 🔥 MUST be first line

        if (err?.status === 401) {
          this.errorMessage = err?.error?.message || 'Invalid credentials';
        } else if (err?.status === 0) {
          this.errorMessage = 'Backend not reachable';
        } else {
          this.errorMessage = 'Server error';
        }
      }
    });
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