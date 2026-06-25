import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeToTerms = false;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  passwordStrength = 0;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  calculatePasswordStrength(): void {
    const password = this.password;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    this.passwordStrength = strength;
  }

  onPasswordChange(): void {
    this.calculatePasswordStrength();
  }

  signup(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validation
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    if (!this.agreeToTerms) {
      this.errorMessage = 'Please agree to Terms and Conditions';
      return;
    }

    this.isLoading = true;

    const payload = {
      username: this.email,     // IMPORTANT mapping
      password: this.password
    };

    this.authService.signup(payload).subscribe({
      next: (res) => {
        console.log('Signup success:', res);

        this.successMessage = 'Account created successfully!';
        this.isLoading = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        console.error('Signup error:', err);

        this.errorMessage = 'Signup failed. Try again.';
        this.isLoading = false;
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  getPasswordStrengthLabel(): string {
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[this.passwordStrength] || 'Very Weak';
  }

  getPasswordStrengthColor(): string {
    const colors = ['#e74c3c', '#e67e22', '#f39c12', '#f1c40f', '#27ae60'];
    return colors[this.passwordStrength] || '#e74c3c';
  }
}
