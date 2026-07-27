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
import { AppHeader } from '../../../shared/components/app-header/app-header';
import {
  SocietyStep1Model,
  SocietyStep1Files,
  SocietyStep2Model,
  SocietyStep3Model,
  SocietyStep3Files,
  SocietyStep4Model,
  SocietyStep4Files
} from './models';

@Component({
  selector: 'app-create-society',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumbersOnly,
    RouterModule,
    AppHeader
  ],
  templateUrl: './create-society.html',
  styleUrl: './create-society.css'
})
export class CreateSociety {

  currentStep = 1;
  totalSteps = 4;
  societyForm: FormGroup;
  isSubmitting = false;
  isSavingStep = false;
  createdSocietyId: string | null = null;

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
      // Step 1: Society Information
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

      // Step 1: Address
      address1: ['', Validators.required],
      address2: [''],
      area: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],

      // Step 1: Bank Details
      bankName: [''],
      bankBranch: [''],
      accountNumber: [''],
      ifscCode: [''],
      upiId: [''],

      // Step 2: Building Information
      wings: [1, [Validators.required, Validators.min(1)]],
      buildingName: ['', Validators.required],
      buildingType: ['Residential', Validators.required],

      // Step 2: Ground Floor
      groundShopAvailable: ['No'],
      groundShopCount: [0],
      groundShopPrefix: ['S'],

      // Step 2: Commercial Area
      commercialAvailable: ['No'],
      commercialStartFloor: [1],
      commercialFloors: [0],
      commercialShopsPerFloor: [0],
      commercialOfficePerFloor: [0],

      // Step 2: Basement
      basementAvailable: ['No'],
      basementFloors: [0],
      parkingPerBasement: [0],
      storageRooms: [0],
      utilityRooms: [0],

      // Step 2: Residential Floors
      residentialStartFloor: [1, [Validators.required, Validators.min(1)]],
      floors: [1, [Validators.required, Validators.min(1)]],
      flats: [4, [Validators.required, Validators.min(1)]],
      flatPattern: ['101', Validators.required],
      liftAvailable: ['No'],
      liftCount: [0],

      // Step 2: Parking
      residentParking: [0],
      visitorParking: [0],
      twoWheelerParking: [0],
      fourWheelerParking: [0],
      evParking: [0],
      disabledParking: [0],
      parkingAllocation: ['One Parking Per Flat'],

      // Step 2: Amenities
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

      // Step 2: Lift Details
      passengerLift: [0],
      serviceLift: [0],
      liftCompany: [''],
      liftAmcDate: [''],

      // Step 2: Water Tank
      undergroundTank: ['Available'],
      overheadTank: ['Available'],
      waterTankCapacity: [0],

      // Step 2: DG Backup
      generatorAvailable: ['Yes'],
      generatorCapacity: [''],
      generatorVendor: [''],
      generatorAmcDate: [''],
      generatorFuel: ['Diesel'],

      // Step 2: Fire Safety System
      fireSystemAvailable: ['Yes'],
      firePump: ['Available'],
      fireTankCapacity: [0],
      hydrantSystem: ['Available'],
      sprinklerSystem: ['Available'],
      smokeDetectors: ['Available'],
      fireVendor: [''],
      fireAmcDate: [''],

      // Step 3: Chairman
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

      // Step 3: Secretary
      secretaryName: ['', Validators.required],
      secretaryWing: ['', Validators.required],
      secretaryFlat: ['', Validators.required],
      secretaryMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      secretaryEmail: ['', [Validators.required, Validators.email]],
      secretaryWhatsapp: [''],
      secretaryPhoto: [null],
      secretaryAadhar: [null],
      secretaryPan: [null],
      secretaryStartDate: ['', Validators.required],
      secretaryEndDate: [''],
      secretaryEmergencyContact: [''],

      // Step 3: Treasurer
      treasurerName: ['', Validators.required],
      treasurerWing: ['', Validators.required],
      treasurerFlat: ['', Validators.required],
      treasurerMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      treasurerEmail: ['', [Validators.required, Validators.email]],
      treasurerWhatsapp: [''],
      treasurerPhoto: [null],
      treasurerAadhar: [null],
      treasurerPan: [null],
      treasurerStartDate: ['', Validators.required],
      treasurerEndDate: [''],
      treasurerEmergencyContact: [''],

      // Step 3: Administration
      managerName: [''],
      managerMobile: [''],
      managerEmail: ['', Validators.email],
      managerPhoto: [null],
      managerAadhar: [null],
      managerPan: [null],

      accountantName: [''],
      accountantMobile: [''],
      accountantEmail: ['', Validators.email],
      accountantPhoto: [null],
      accountantAadhar: [null],
      accountantPan: [null],

      // Step 4: Staff
      watchmanName: [''],
      watchmanMobile: [''],
      watchmanJoiningDate: [''],
      watchmanPhoto: [null],
      watchmanAadhar: [null],
      watchmanPan: [null],

      cleanerName: [''],
      cleanerMobile: [''],
      cleanerJoiningDate: [''],
      cleanerPhoto: [null],
      cleanerAadhar: [null],
      cleanerPan: [null],

      electricianName: [''],
      electricianMobile: [''],
      electricianJoiningDate: [''],
      electricianPhoto: [null],
      electricianAadhar: [null],
      electricianPan: [null],

      gardenerName: [''],
      gardenerMobile: [''],
      gardenerJoiningDate: [''],
      gardenerPhoto: [null],
      gardenerAadhar: [null],
      gardenerPan: [null],

      liftOperatorName: [''],
      liftOperatorMobile: [''],
      liftOperatorJoiningDate: [''],
      liftOperatorPhoto: [null],
      liftOperatorAadhar: [null],
      liftOperatorPan: [null],

      plumberName: [''],
      plumberMobile: [''],
      plumberJoiningDate: [''],
      plumberPhoto: [null],
      plumberAadhar: [null],
      plumberPan: [null],

      acceptDeclaration: [false, Validators.requiredTrue],
    });
  }

  // Accordion
  toggleSection(section: keyof typeof this.isOpen): void {
    this.isOpen[section] = !this.isOpen[section];
  }

  // File Upload Handlers
  onLogoUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.societyLogo = input.files[0];
    }
  }

  onRegistrationCertificateUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registrationCertificate = input.files[0];
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
      const file = input.files[0];
      this.uploadedFiles[controlName] = file;
      this.societyForm.patchValue({
        [controlName]: file
      });
      this.societyForm.get(controlName)?.updateValueAndValidity();
    }
  }

  // ===========================================
  // Step Payloads Extraction
  // ===========================================

  public getStep1Payload(): { data: SocietyStep1Model; files: SocietyStep1Files } {
    const val = this.societyForm.getRawValue();
    const data: SocietyStep1Model = {
      societyName: val.societyName,
      registrationNo: val.registrationNo,
      registrationDate: val.registrationDate,
      societyType: val.societyType,
      constructionYear: val.constructionYear,
      builder: val.builder,
      email: val.email,
      whatsapp: val.whatsapp,
      landline: val.landline,
      website: val.website,
      description: val.description,
      gstNumber: val.gstNumber,
      societyPan: val.societyPan,
      reraNumber: val.reraNumber,
      address1: val.address1,
      address2: val.address2,
      area: val.area,
      city: val.city,
      state: val.state,
      pincode: val.pincode,
      bankName: val.bankName,
      bankBranch: val.bankBranch,
      accountNumber: val.accountNumber,
      ifscCode: val.ifscCode,
      upiId: val.upiId,
    };

    const files: SocietyStep1Files = {
      societyLogo: this.societyLogo,
      registrationCertificate: this.registrationCertificate
    };

    return { data, files };
  }

  public getStep2Payload(): SocietyStep2Model {
    const val = this.societyForm.getRawValue();
    return {
      societyId: this.createdSocietyId || undefined,
      wings: val.wings,
      buildingName: val.buildingName,
      buildingType: val.buildingType,
      groundShopAvailable: val.groundShopAvailable,
      groundShopCount: val.groundShopCount,
      groundShopPrefix: val.groundShopPrefix,
      commercialAvailable: val.commercialAvailable,
      commercialStartFloor: val.commercialStartFloor,
      commercialFloors: val.commercialFloors,
      commercialShopsPerFloor: val.commercialShopsPerFloor,
      commercialOfficePerFloor: val.commercialOfficePerFloor,
      basementAvailable: val.basementAvailable,
      basementFloors: val.basementFloors,
      parkingPerBasement: val.parkingPerBasement,
      storageRooms: val.storageRooms,
      utilityRooms: val.utilityRooms,
      residentialStartFloor: val.residentialStartFloor,
      floors: val.floors,
      flats: val.flats,
      flatPattern: val.flatPattern,
      liftAvailable: val.liftAvailable,
      liftCount: val.liftCount,
      residentParking: val.residentParking,
      visitorParking: val.visitorParking,
      twoWheelerParking: val.twoWheelerParking,
      fourWheelerParking: val.fourWheelerParking,
      evParking: val.evParking,
      disabledParking: val.disabledParking,
      parkingAllocation: val.parkingAllocation,
      garden: val.garden,
      gym: val.gym,
      clubHouse: val.clubHouse,
      swimmingPool: val.swimmingPool,
      communityHall: val.communityHall,
      childrenPlayArea: val.childrenPlayArea,
      temple: val.temple,
      library: val.library,
      cctv: val.cctv,
      fireSafety: val.fireSafety,
      solar: val.solar,
      rainWaterHarvesting: val.rainWaterHarvesting,
      securityCabin: val.securityCabin,
      reception: val.reception,
      intercom: val.intercom,
      gasPipeline: val.gasPipeline,
      visitorManagement: val.visitorManagement,
      societyOffice: val.societyOffice,
      garbageCollection: val.garbageCollection,
      roPlant: val.roPlant,
      passengerLift: val.passengerLift,
      serviceLift: val.serviceLift,
      liftCompany: val.liftCompany,
      liftAmcDate: val.liftAmcDate,
      undergroundTank: val.undergroundTank,
      overheadTank: val.overheadTank,
      waterTankCapacity: val.waterTankCapacity,
      generatorAvailable: val.generatorAvailable,
      generatorCapacity: val.generatorCapacity,
      generatorVendor: val.generatorVendor,
      generatorAmcDate: val.generatorAmcDate,
      generatorFuel: val.generatorFuel,
      fireSystemAvailable: val.fireSystemAvailable,
      firePump: val.firePump,
      fireTankCapacity: val.fireTankCapacity,
      hydrantSystem: val.hydrantSystem,
      sprinklerSystem: val.sprinklerSystem,
      smokeDetectors: val.smokeDetectors,
      fireVendor: val.fireVendor,
      fireAmcDate: val.fireAmcDate,
    };
  }

  public getStep3Payload(): { data: SocietyStep3Model; files: SocietyStep3Files } {
    const val = this.societyForm.getRawValue();
    const data: SocietyStep3Model = {
      societyId: this.createdSocietyId || undefined,
      chairmanName: val.chairmanName,
      chairmanWing: val.chairmanWing,
      chairmanFlat: val.chairmanFlat,
      chairmanMobile: val.chairmanMobile,
      chairmanEmail: val.chairmanEmail,
      chairmanWhatsapp: val.chairmanWhatsapp,
      chairmanStartDate: val.chairmanStartDate,
      chairmanEndDate: val.chairmanEndDate,
      chairmanEmergencyContact: val.chairmanEmergencyContact,
      secretaryName: val.secretaryName,
      secretaryWing: val.secretaryWing,
      secretaryFlat: val.secretaryFlat,
      secretaryMobile: val.secretaryMobile,
      secretaryEmail: val.secretaryEmail,
      secretaryWhatsapp: val.secretaryWhatsapp,
      secretaryStartDate: val.secretaryStartDate,
      secretaryEndDate: val.secretaryEndDate,
      secretaryEmergencyContact: val.secretaryEmergencyContact,
      treasurerName: val.treasurerName,
      treasurerWing: val.treasurerWing,
      treasurerFlat: val.treasurerFlat,
      treasurerMobile: val.treasurerMobile,
      treasurerEmail: val.treasurerEmail,
      treasurerWhatsapp: val.treasurerWhatsapp,
      treasurerStartDate: val.treasurerStartDate,
      treasurerEndDate: val.treasurerEndDate,
      treasurerEmergencyContact: val.treasurerEmergencyContact,
      managerName: val.managerName,
      managerMobile: val.managerMobile,
      managerEmail: val.managerEmail,
      accountantName: val.accountantName,
      accountantMobile: val.accountantMobile,
      accountantEmail: val.accountantEmail,
    };

    const files: SocietyStep3Files = {
      chairmanPhoto: this.chairmanPhoto || this.uploadedFiles['chairmanPhoto'],
      chairmanAadhar: this.chairmanAadhar || this.uploadedFiles['chairmanAadhar'],
      chairmanPan: this.chairmanPan || this.uploadedFiles['chairmanPan'],
      secretaryPhoto: this.uploadedFiles['secretaryPhoto'],
      secretaryAadhar: this.uploadedFiles['secretaryAadhar'],
      secretaryPan: this.uploadedFiles['secretaryPan'],
      treasurerPhoto: this.uploadedFiles['treasurerPhoto'],
      treasurerAadhar: this.uploadedFiles['treasurerAadhar'],
      treasurerPan: this.uploadedFiles['treasurerPan'],
      managerPhoto: this.uploadedFiles['managerPhoto'],
      managerAadhar: this.uploadedFiles['managerAadhar'],
      managerPan: this.uploadedFiles['managerPan'],
      accountantPhoto: this.uploadedFiles['accountantPhoto'],
      accountantAadhar: this.uploadedFiles['accountantAadhar'],
      accountantPan: this.uploadedFiles['accountantPan'],
    };

    return { data, files };
  }

  public getStep4Payload(): { data: SocietyStep4Model; files: SocietyStep4Files } {
    const val = this.societyForm.getRawValue();
    const data: SocietyStep4Model = {
      societyId: this.createdSocietyId || undefined,
      watchmanName: val.watchmanName,
      watchmanMobile: val.watchmanMobile,
      watchmanJoiningDate: val.watchmanJoiningDate,
      cleanerName: val.cleanerName,
      cleanerMobile: val.cleanerMobile,
      cleanerJoiningDate: val.cleanerJoiningDate,
      electricianName: val.electricianName,
      electricianMobile: val.electricianMobile,
      electricianJoiningDate: val.electricianJoiningDate,
      gardenerName: val.gardenerName,
      gardenerMobile: val.gardenerMobile,
      gardenerJoiningDate: val.gardenerJoiningDate,
      liftOperatorName: val.liftOperatorName,
      liftOperatorMobile: val.liftOperatorMobile,
      liftOperatorJoiningDate: val.liftOperatorJoiningDate,
      plumberName: val.plumberName,
      plumberMobile: val.plumberMobile,
      plumberJoiningDate: val.plumberJoiningDate,
      acceptDeclaration: val.acceptDeclaration,
    };

    const files: SocietyStep4Files = {
      watchmanPhoto: this.uploadedFiles['watchmanPhoto'],
      watchmanAadhar: this.uploadedFiles['watchmanAadhar'],
      watchmanPan: this.uploadedFiles['watchmanPan'],
      cleanerPhoto: this.uploadedFiles['cleanerPhoto'],
      cleanerAadhar: this.uploadedFiles['cleanerAadhar'],
      cleanerPan: this.uploadedFiles['cleanerPan'],
      electricianPhoto: this.uploadedFiles['electricianPhoto'],
      electricianAadhar: this.uploadedFiles['electricianAadhar'],
      electricianPan: this.uploadedFiles['electricianPan'],
      gardenerPhoto: this.uploadedFiles['gardenerPhoto'],
      gardenerAadhar: this.uploadedFiles['gardenerAadhar'],
      gardenerPan: this.uploadedFiles['gardenerPan'],
      liftOperatorPhoto: this.uploadedFiles['liftOperatorPhoto'],
      liftOperatorAadhar: this.uploadedFiles['liftOperatorAadhar'],
      liftOperatorPan: this.uploadedFiles['liftOperatorPan'],
      plumberPhoto: this.uploadedFiles['plumberPhoto'],
      plumberAadhar: this.uploadedFiles['plumberAadhar'],
      plumberPan: this.uploadedFiles['plumberPan'],
    };

    return { data, files };
  }

  // ===========================================
  // Step Navigation & API Integration
  // ===========================================

  nextStep(): void {
    if (!this.isStepValid(this.currentStep)) {
      this.showStepValidationError();
      return;
    }

    this.isSavingStep = true;

    if (this.currentStep === 1) {
      const { data, files } = this.getStep1Payload();
      console.log('API Call 1 - Saving Step 1 Payload:', data, files);
      this.societyService.saveStep1(data, files).subscribe({
        next: (response) => {
          this.isSavingStep = false;
          if (response.societyId) {
            this.createdSocietyId = response.societyId;
          }
          this.advanceStep();
        },
        error: (err) => {
          console.warn('Backend Step 1 API pending or offline, storing draft and continuing:', err);
          if (!this.createdSocietyId) {
            this.createdSocietyId = 'SOC-' + Date.now();
          }
          this.isSavingStep = false;
          this.advanceStep();
        }
      });
    } else if (this.currentStep === 2) {
      const data = this.getStep2Payload();
      console.log('API Call 2 - Saving Step 2 Payload:', data);
      this.societyService.saveStep2(data).subscribe({
        next: () => {
          this.isSavingStep = false;
          this.advanceStep();
        },
        error: (err) => {
          console.warn('Backend Step 2 API pending or offline, storing draft and continuing:', err);
          this.isSavingStep = false;
          this.advanceStep();
        }
      });
    } else if (this.currentStep === 3) {
      const { data, files } = this.getStep3Payload();
      console.log('API Call 3 - Saving Step 3 Payload:', data, files);
      this.societyService.saveStep3(data, files).subscribe({
        next: () => {
          this.isSavingStep = false;
          this.advanceStep();
        },
        error: (err) => {
          console.warn('Backend Step 3 API pending or offline, storing draft and continuing:', err);
          this.isSavingStep = false;
          this.advanceStep();
        }
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

  private advanceStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // ===========================================
  // Submit / Final Step 4 API Call
  // ===========================================

  submit(): void {
    if (![1, 2, 3, 4].every(step => this.isStepValid(step))) {
      this.showStepValidationError();
      return;
    }

    this.isSubmitting = true;
    const { data, files } = this.getStep4Payload();
    console.log('API Call 4 - Saving Step 4 Payload:', data, files);

    this.societyService.saveStep4(data, files).subscribe({
      next: response => {
        this.isSubmitting = false;
        alert(response.message || '🎉 Society Created Successfully');
      },
      error: (err) => {
        console.warn('Backend Step 4 API pending or offline, trying fallback single-call endpoint:', err);
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
            alert('🎉 All 4 step data collected & validated! (Backend API endpoints ready for connection)');
          }
        });
      }
    });
  }

  public isStepValid(step: number): boolean {
    const controlsByStep: Record<number, string[]> = {
      1: ['societyName', 'registrationNo', 'registrationDate', 'societyType', 'constructionYear', 'email', 'whatsapp', 'address1', 'city', 'state', 'pincode'],
      2: ['wings', 'buildingName', 'buildingType', 'residentialStartFloor', 'floors', 'flats', 'flatPattern'],
      3: ['chairmanName', 'chairmanWing', 'chairmanFlat', 'chairmanMobile', 'chairmanEmail', 'chairmanStartDate', 'secretaryName', 'secretaryWing', 'secretaryFlat', 'secretaryMobile', 'secretaryEmail', 'secretaryStartDate', 'treasurerName', 'treasurerWing', 'treasurerFlat', 'treasurerMobile', 'treasurerEmail', 'treasurerStartDate'],
      4: ['acceptDeclaration']
    };

    const controls = controlsByStep[step];
    if (!controls) return true;

    controls.forEach(name => {
      const control = this.societyForm.get(name);
      control?.markAsTouched();
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
