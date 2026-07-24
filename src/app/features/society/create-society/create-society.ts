import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-create-society',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-society.html',
  styleUrl: './create-society.css'
})
export class CreateSociety {

  currentStep = 1;

  totalSteps = 4;

  societyForm: FormGroup;

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
  };

  // Upload Files

  registrationCertificate: File | null = null;

  societyLogo: File | null = null;

  constructor(private fb: FormBuilder) {


    this.societyForm = this.fb.group({

      // Step 1

            // ===========================================
      // Society Information
      // ===========================================

      societyName: ['', Validators.required],

      registrationNo: [''],

      registrationDate: [''],

      reraNumber: [''],

      societyType: ['Residential'],

      constructionYear: [''],

      builder: [''],

      email: ['', [Validators.email]],

      whatsapp: ['', Validators.required],

      landline: [''],

      website: [''],

      description: [''],

      gstNumber: [''],

      societyPan: [''],
      // ===========================================
      // Address
      // ===========================================

      address1: [''],

      address2: [''],

      area: [''],

      city: ['', Validators.required],

      state: ['', Validators.required],

      pincode: ['', Validators.required],

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

      wings: [1],

      buildingName: [''],

      buildingType: ['Residential'],

      totalBuildings: [1],

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

      residentialStartFloor: [1],

      floors: [1],

      flats: [4],

      flatPattern: ['101'],

      liftAvailable: ['No'],

      liftCount: [0],

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

      chairmanName: [''],

      chairmanWing: [''],

      chairmanFlat: [''],

      chairmanMobile: [''],

      chairmanEmail: ['', Validators.email],

      chairmanWhatsapp: [''],

      chairmanPhoto: [null],
      chairmanAadhar: [null],
      chairmanPan: [null],

      chairmanStartDate: [''],
      chairmanEndDate: [''],
      chairmanEmergencyContact: [''],

      // ===========================================
      // Secretary
      // ===========================================

      secretaryName: [''],

      secretaryWing: [''],

      secretaryFlat: [''],

      secretaryMobile: [''],

      secretaryEmail: ['', Validators.email],

      secretaryWhatsapp: [''],

      secretaryPhoto:[null],
      secretaryAadhar:[null],
      secretaryPan:[null],

      secretaryStartDate:[''],
      secretaryEndDate:[''],
      secretaryEmergencyContact:[''],

      // ===========================================
      // Treasurer
      // ===========================================

      treasurerName: [''],

      treasurerWing: [''],

      treasurerFlat: [''],

      treasurerMobile: [''],

      treasurerEmail: ['', Validators.email],

      treasurerWhatsapp: [''],

      treasurerPhoto:[null],
      treasurerAadhar:[null],
      treasurerPan:[null],

      treasurerStartDate:[''],
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

    if (this.societyForm.invalid) {

      this.societyForm.markAllAsTouched();

      alert('Please complete all mandatory fields.');

      return;

    }

    const payload = {

      ...this.societyForm.value,

      societyLogo: this.societyLogo,

      registrationCertificate: this.registrationCertificate

    };

    console.log('Society Payload');

    console.log(payload);

    alert('🎉 Society Created Successfully');

    // Future API Call
    // this.societyService.createSociety(payload).subscribe(...);

  }

}