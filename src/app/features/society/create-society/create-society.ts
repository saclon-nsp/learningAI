import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NumbersOnly } from '../../../shared/directives/numbers-only';
import { SocietyService } from '../../../services/society.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-society',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumbersOnly,
    RouterModule
  ],
  templateUrl: './create-society.html',
  styleUrl: './create-society.css'
})
export class CreateSociety {

  currentStep = 1;

  totalSteps = 4;

  societyForm: FormGroup;

  isSubmitting = false;

  chairmanPhoto: File | null = null;
  chairmanAadhar: File | null = null;
  chairmanPan: File | null = null;
  uploadedFiles: { [key: string]: File } = {};

  // Accordion Sections

  isOpen = {

    basic: true,

    ground: false,

    commercial: false,

    basement: false,

    residential: false,

    parking: false,

    amenities: false,

    liftDetails: false,

    waterTank: false,

    dgBackup: false,

    fireSystem: false,

    chairman: true,

    secretary: false,

    treasurer: false,

    manager: false,

    accountant: false,
  };

  // Upload Files

  registrationCertificate: File | null = null;

  societyLogo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private societyService: SocietyService,
    public authService: AuthService,
    private router: Router
  ) {


    this.societyForm = this.fb.group({

      // Step 1

            // ===========================================
      // Society Information
      // ===========================================

      societyName: ['', Validators.required],

      registrationNo: ['', Validators.required],

      registrationDate: ['', Validators.required],

      reraNumber: [''],

      societyType: ['Residential', Validators.required],

      constructionYear: ['', Validators.required],

      builder: [''],

      email: ['', [Validators.required, Validators.email]],

      whatsapp: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      landline: [''],

      website: [''],

      description: [''],

      gstNumber: [''],

      societyPan: [''],
      // ===========================================
      // Address
      // ===========================================

      address1: ['', Validators.required],

      address2: [''],

      area: [''],

      city: ['', Validators.required],

      state: ['', Validators.required],

      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],

      // ==========================
      // Bank Details
      // ==========================

      bankName: [''],
      bankBranch: [''],
      accountNumber: [''],
      ifscCode: [''],
      upiId: [''],

      // ===========================================
      // Building Information
      // ===========================================

      wings: [1, [Validators.required, Validators.min(1)]],

      buildingName: ['', Validators.required],

      buildingType: ['Residential', Validators.required],

      // ===========================================
      // Ground Floor
      // ===========================================

      groundShopAvailable: ['No'],

      groundShopCount: [0],

      groundShopPrefix: ['S'],

      // ===========================================
      // Commercial Area
      // ===========================================

      commercialAvailable: ['No'],

      commercialStartFloor: [1],

      commercialFloors: [0],

      commercialShopsPerFloor: [0],

      commercialOfficePerFloor: [0],

      // ===========================================
      // Basement
      // ===========================================

      basementAvailable: ['No'],

      basementFloors: [0],

      parkingPerBasement: [0],

      storageRooms: [0],

      utilityRooms: [0],

            // ===========================================
      // Residential Floors
      // ===========================================

      residentialStartFloor: [1, [Validators.required, Validators.min(1)]],

      floors: [1, [Validators.required, Validators.min(1)]],

      flats: [4, [Validators.required, Validators.min(1)]],

      flatPattern: ['101', Validators.required],

      liftAvailable: ['No'],

      // liftCount: [0],

      // ===========================================
      // Parking
      // ===========================================

      residentParking: [0],

      visitorParking: [0],

      twoWheelerParking: [0],

      fourWheelerParking: [0],

      evParking: [0],

      disabledParking: [0],

      parkingAllocation: ['One Parking Per Flat'],

      // ===========================================
      // Amenities
      // ===========================================

      garden: [false],
      gym: [false],
      clubHouse: [false],
      swimmingPool: [false],
      communityHall: [false],
      childrenPlayArea: [false],
      temple: [false],
      library: [false],
      cctv: [false],
      fireSafety: [false],
      solar: [false],
      rainWaterHarvesting: [false],
      securityCabin: [false],
      reception: [false],
      intercom: [false],
      gasPipeline: [false],
      visitorManagement: [false],
      societyOffice: [false],
      garbageCollection: [false],
      roPlant: [false],

      // ===========================
      // Lift Details
      // ===========================

      passengerLift: [0],
      serviceLift: [0],
      liftCompany: [''],
      liftAmcDate: [''],

      // ===========================
      // Water Tank
      // ===========================

      undergroundTank: ['Available'],
      overheadTank: ['Available'],
      waterTankCapacity: [0],

      // ===========================
      // DG Backup
      // ===========================

      generatorAvailable: ['Yes'],
      generatorCapacity: [''],
      generatorVendor: [''],
      generatorAmcDate: [''],
      generatorFuel: ['Diesel'],

      // ===========================
      // Fire Safety System
      // ===========================

      fireSystemAvailable: ['Yes'],
      firePump: ['Available'],
      fireTankCapacity: [0],
      hydrantSystem: ['Available'],
      sprinklerSystem: ['Available'],
      smokeDetectors: ['Available'],
      fireVendor: [''],
      fireAmcDate: [''],

      // ===========================================
      // Chairman
      // ===========================================

      chairmanName: ['', Validators.required],

      chairmanWing: ['', Validators.required],

      chairmanFlat: ['', Validators.required],

      chairmanMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      chairmanEmail: ['', [Validators.required, Validators.email]],

      chairmanWhatsapp: [''],

      chairmanPhoto: [null],
      chairmanAadhar: [null],
      chairmanPan: [null],

      chairmanStartDate: ['', Validators.required],
      chairmanEndDate: [''],
      chairmanEmergencyContact: [''],

      // ===========================================
      // Secretary
      // ===========================================

      secretaryName: ['', Validators.required],

      secretaryWing: ['', Validators.required],

      secretaryFlat: ['', Validators.required],

      secretaryMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      secretaryEmail: ['', [Validators.required, Validators.email]],

      secretaryWhatsapp: [''],

      secretaryPhoto:[null],
      secretaryAadhar:[null],
      secretaryPan:[null],

      secretaryStartDate:['', Validators.required],
      secretaryEndDate:[''],
      secretaryEmergencyContact:[''],

      // ===========================================
      // Treasurer
      // ===========================================

      treasurerName: ['', Validators.required],

      treasurerWing: ['', Validators.required],

      treasurerFlat: ['', Validators.required],

      treasurerMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      treasurerEmail: ['', [Validators.required, Validators.email]],

      treasurerWhatsapp: [''],

      treasurerPhoto:[null],
      treasurerAadhar:[null],
      treasurerPan:[null],

      treasurerStartDate:['', Validators.required],
      treasurerEndDate:[''],
      treasurerEmergencyContact:[''],

      // ============================
      // Society Administration
      // ============================

      // Manager

      managerName:[''],
      managerMobile:[''],
      managerEmail:['', Validators.email],
      managerPhoto:[null],
      managerAadhar: [null],
      managerPan: [null],

      // Accountant

      accountantName:[''],
      accountantMobile:[''],
      accountantEmail:['', Validators.email],
      accountantPhoto:[null],
      accountantAadhar: [null],
      accountantPan: [null],

      // ============================
      // Society Staff
      // ============================

      // Watchman
      watchmanName: [''],
      watchmanMobile: [''],
      watchmanJoiningDate: [''],
      watchmanPhoto: [null],
      watchmanAadhar: [null],
      watchmanPan: [null],


      // Cleaner
      cleanerName: [''],
      cleanerMobile: [''],
      cleanerJoiningDate: [''],
      cleanerPhoto: [null],
      cleanerAadhar: [null],
      cleanerPan: [null],

      // Electrician
      electricianName: [''],
      electricianMobile: [''],
      electricianJoiningDate: [''],
      electricianPhoto: [null],
      electricianAadhar: [null],
      electricianPan: [null],

      // Gardener
      gardenerName: [''],
      gardenerMobile: [''],
      gardenerJoiningDate: [''],
      gardenerPhoto: [null],
      gardenerAadhar: [null],
      gardenerPan: [null],

      // Lift Operator
      liftOperatorName: [''],
      liftOperatorMobile: [''],
      liftOperatorJoiningDate: [''],
      liftOperatorPhoto: [null],
      liftOperatorAadhar: [null],
      liftOperatorPan: [null],
      
      // Plumber
      plumberName: [''],
      plumberMobile: [''],
      plumberJoiningDate: [''],
      plumberPhoto: [null],
      plumberAadhar: [null],
      plumberPan: [null],

      acceptDeclaration: [false, Validators.requiredTrue],
    });
    

  }

    // ===========================================
  // Accordion
  // ===========================================

  toggleSection(section: keyof typeof this.isOpen): void {

    this.isOpen[section] = !this.isOpen[section];

  }

  // ===========================================
  // File Upload
  // ===========================================

  onLogoUpload(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.societyLogo = input.files[0];

      console.log('Society Logo:', this.societyLogo);

    }

  }

  onRegistrationCertificateUpload(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.registrationCertificate = input.files[0];

      console.log('Registration Certificate:', this.registrationCertificate);

    }

  }

  onChairmanPhotoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.chairmanPhoto = input.files[0];
    }
  }

  onChairmanAadharUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.chairmanAadhar = input.files[0];
    }
  }

  onChairmanPanUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.chairmanPan = input.files[0];
    }
  }

  onFileUpload(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.societyForm.patchValue({
        [controlName]: input.files[0]
      });

      this.societyForm.get(controlName)?.updateValueAndValidity();

      console.log(controlName, input.files[0]);

    }
  }

  // ===========================================
  // Step Navigation
  // ===========================================

  nextStep(): void {

    if (this.currentStep < this.totalSteps) {

      if (!this.isStepValid(this.currentStep)) {
        this.showStepValidationError();
        return;
      }

      this.currentStep++;

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

  }

  previousStep(): void {

    if (this.currentStep > 1) {

      this.currentStep--;

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }

  }

  // ===========================================
  // Submit
  // ===========================================

  submit(): void {

    if (![1, 2, 3, 4].every(step => this.isStepValid(step))) {
      this.showStepValidationError();
      return;
    }

    this.isSubmitting = true;
    this.societyService.createSociety(this.societyForm.getRawValue(), {
      societyLogo: this.societyLogo,
      registrationCertificate: this.registrationCertificate
    }).subscribe({
      next: response => {
        this.isSubmitting = false;
        alert(response.message || '🎉 Society Created Successfully');
      },
      error: () => {
        this.isSubmitting = false;
        alert('Unable to create the society. Please try again.');
      }
    });

  }

  private isStepValid(step: number): boolean {
    const controlsByStep: Record<number, string[]> = {
      1: ['societyName', 'registrationNo', 'registrationDate', 'societyType', 'constructionYear', 'email', 'whatsapp', 'address1', 'city', 'state', 'pincode'],
      2: ['wings', 'buildingName', 'buildingType', 'residentialStartFloor', 'floors', 'flats', 'flatPattern'],
      3: ['chairmanName', 'chairmanWing', 'chairmanFlat', 'chairmanMobile', 'chairmanEmail', 'chairmanStartDate', 'secretaryName', 'secretaryWing', 'secretaryFlat', 'secretaryMobile', 'secretaryEmail', 'secretaryStartDate', 'treasurerName', 'treasurerWing', 'treasurerFlat', 'treasurerMobile', 'treasurerEmail', 'treasurerStartDate'],
      4: ['acceptDeclaration']
    };

    const controls = controlsByStep[step];
    // controls.forEach(name => this.societyForm.get(name)?.markAsTouched());
    controls.forEach(name => {
      const control = this.societyForm.get(name);
      // console.log(name, control?.value, control?.valid, control?.errors);
    });
    return controls.every(name => this.societyForm.get(name)?.valid);
  }

  private showStepValidationError(): void {
    alert('Please complete the required fields before continuing.');
    setTimeout(() => document.querySelector<HTMLElement>('.ng-invalid.ng-touched')?.focus());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
