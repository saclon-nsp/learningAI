import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuccessPopup } from '../../../shared/components/success-popup/success-popup';
import { PopupService } from '../../../shared/services/popup';

@Component({
  selector: 'app-email-signup',
  imports: [CommonModule,
    FormsModule,
    SuccessPopup],
  templateUrl: './email-signup.html',
  styleUrl: './email-signup.css',
})
export class EmailSignup {


  firstName = '';
  lastName = '';

  email_Id = '';

  password = '';
  confirmPassword = '';

  agreeToTerms = false;

  errorMessage = '';
  successMessage = '';

  isLoading = signal(false);

  passwordStrength = 0;

  showPassword = false;
  showConfirmPassword = false;

  redirectToLogin = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    public popupService: PopupService  
  ){}

  ngOnInit(): void {

    if(this.authService.isLoggedIn()){

      this.router.navigate(['/home']);

    }

  }

  calculatePasswordStrength(): void {

    const password = this.password;

    let strength = 0;


    if(password.length >= 8)
      strength++;


    if(password.match(/[a-z]/) &&
       password.match(/[A-Z]/))
       strength++;


    if(password.match(/\d/))
      strength++;


    if(password.match(/[^a-zA-Z\d]/))
      strength++;


    this.passwordStrength = strength;

  }

  onPasswordChange(){

    this.calculatePasswordStrength();

  }

  signup(){


    this.errorMessage='';
    this.successMessage='';



    if(
      !this.firstName ||
      !this.lastName ||
      !this.email_Id ||
      !this.password ||
      !this.confirmPassword
    ){

      this.errorMessage="Please fill in all fields";
      return;

    }



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email_Id)) {

      this.errorMessage =
        "Please enter a valid email address";

      return;
    }



    if(this.password !== this.confirmPassword){

      this.errorMessage =
      "Passwords do not match";

      return;

    }



    if(this.password.length < 6){

      this.errorMessage =
      "Password must be at least 6 characters";

      return;

    }



    if(!this.agreeToTerms){

      this.errorMessage =
      "Please agree to Terms and Conditions";

      return;

    }



    this.isLoading.set(true);



    const payload={

      first_name:this.firstName,

      last_name:this.lastName,

      email:this.email_Id,

      password:this.password

    };

    this.authService.emailSignup(payload)
    .subscribe({

      next:(res)=>{

        console.log(
          "Email signup success",
          res
        );

        this.successMessage =
        "Account created successfully!";

        this.isLoading.set(false);

        // setTimeout(()=>{

        //   this.router.navigate(['/login']);

        // },1000);
        this.redirectToLogin.set(true);
        this.popupService.success(res.message || 'Your account has been created successfully.','Signup Successful');

      },
      error:(err)=>{

        console.error(
          "Signup error",
          err
        );

        this.errorMessage =
        "Signup failed. Try again";

        this.isLoading.set(false);

        this.redirectToLogin.set(false);

        this.popupService.error(err?.error?.detail || 'Something went wrong. Please try again.', 'Signup Failed');

      }


    });


  }

  closePopup(): void {

    this.popupService.close();
    if(this.redirectToLogin()) {
      this.router.navigate(['/login']);
    }

  }

  getPasswordStrengthLabel(): string {


    const labels=[

      '',
      'Weak',
      'Fair',
      'Good',
      'Strong'

    ];


    return labels[this.passwordStrength] || 'Very Weak';


  }

  getPasswordStrengthColor(): string {


    const colors=[

      '#e74c3c',
      '#e67e22',
      '#f39c12',
      '#f1c40f',
      '#27ae60'

    ];


    return colors[this.passwordStrength] || '#e74c3c';


  }

  togglePassword(): void {

    this.showPassword = !this.showPassword;

  }

  toggleConfirmPassword(): void {

    this.showConfirmPassword = !this.showConfirmPassword;

  }

}
