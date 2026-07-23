import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-google-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './google-signup.html',
  styleUrl: './google-signup.css'
})
export class GoogleSignup {

  isLoading = signal(false);

  errorMessage = '';

  successMessage = '';

  constructor(
    private router: Router
  ) { }



  signInWithGoogle(): void {

    this.errorMessage = '';

    this.successMessage = '';

    this.isLoading.set(true);


    // this.authService.googleLogin().subscribe({

    //   next: (res) => {

    //     this.isLoading.set(false);
    //     this.successMessage = 'Google Sign-In Successful';
    //     sessionStorage.setItem('token', res.token);
    //     this.router.navigate(['/home']);

    //   },

    //   error: (err) => {

    //     this.isLoading.set(false);
    //     this.errorMessage = 'Google Sign-In Failed';
    //     console.error(err);

    //   }

    // });


    // ===========================================
    // Replace this with Google Authentication API
    // ===========================================

    setTimeout(() => {

      this.isLoading.set(false);

      this.successMessage =
        'Google Sign-In Successful';

      console.log('Google User');

      console.log({

        firstName: 'John',

        lastName: 'Doe',

        email: 'john.doe@gmail.com'

      });

      setTimeout(() => {

        this.router.navigate(['/home']);

      }, 1000);

    }, 3000);

  }

}