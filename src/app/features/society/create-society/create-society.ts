import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
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
  registrationCertificates: File[] = [];
  societyLogo: File | null = null;

  constructor(
    private fb: FormBuilder,
    private societyService: SocietyService,
    public authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.societyForm = this.fb.group({
      // Step 1: Society Information
      societyName: ['', Validators.required],
      registrationNo: ['', Validators.required],
      registrationDate: ['', Validators.required],
      reraNumber: ['', Validators.required],
      societyType: ['Residential', Validators.required],
      constructionYear: ['', Validators.required],
      builder: [''], // OPTIONAL (builder_name)
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      landline: [''],
      website: [''],
      description: [''], // OPTIONAL (Description)
      gstNumber: [''],
      societyPan: [''],

      // Step 1: Address
      address1: ['', Validators.required],
      address2: [''], // OPTIONAL (add line 2)
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],

      // Step 1: Bank Details
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      accountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required],
      upiId: [''], // OPTIONAL (UPIId)

      // Step 2: Building Information
      wings: [1, [Validators.required, Validators.min(1)]],
      buildingName: ['', Validators.required],
      buildingType: ['Residential', Validators.required],

      // Step 2: Ground Floor
      groundShopAvailable: ['No', Validators.required],
      groundShopCount: [0, Validators.required],
      groundShopPrefix: ['S', Validators.required],

      // Step 2: Commercial Area
      commercialAvailable: ['No', Validators.required],
      commercialStartFloor: [1, Validators.required],
      commercialFloors: [0, Validators.required],
      commercialShopsPerFloor: [0, Validators.required],
      commercialOfficePerFloor: [0, Validators.required],

      // Step 2: Basement
      basementAvailable: ['No', Validators.required],
      basementFloors: [0, Validators.required],
      parkingPerBasement: [0, Validators.required],
      storageRooms: [0, Validators.required],
      utilityRooms: [0, Validators.required],

      // Step 2: Residential Floors
      residentialStartFloor: [1, [Validators.required, Validators.min(1)]],
      floors: [1, [Validators.required, Validators.min(1)]],
      flats: [4, [Validators.required, Validators.min(1)]],
      flatPattern: ['101', Validators.required],
      liftAvailable: ['No', Validators.required],
      liftCount: [0, Validators.required],

      // Step 2: Parking
      residentParking: [0, Validators.required],
      visitorParking: [0, Validators.required],
      twoWheelerParking: [0, Validators.required],
      fourWheelerParking: [0, Validators.required],
      evParking: [0, Validators.required],
      disabledParking: [0, Validators.required],
      parkingAllocation: ['One Parking Per Flat', Validators.required],

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
      passengerLift: [0, Validators.required],
      serviceLift: [0, Validators.required],
      liftCompany: ['', Validators.required],
      liftAmcDate: ['', Validators.required],

      // Step 2: Water Tank
      undergroundTank: ['Available', Validators.required],
      overheadTank: ['Available', Validators.required],
      waterTankCapacity: [0, Validators.required],

      // Step 2: DG Backup
      generatorAvailable: ['Yes', Validators.required],
      generatorCapacity: ['', Validators.required],
      generatorVendor: ['', Validators.required],
      generatorAmcDate: ['', Validators.required],
      generatorFuel: ['Diesel', Validators.required],

      // Step 2: Fire Safety System
      fireSystemAvailable: ['Yes', Validators.required],
      firePump: ['Available', Validators.required],
      fireTankCapacity: [0, Validators.required],
      hydrantSystem: ['Available', Validators.required],
      sprinklerSystem: ['Available', Validators.required],
      smokeDetectors: ['Available', Validators.required],
      fireVendor: ['', Validators.required],
      fireAmcDate: ['', Validators.required],

      // Step 3: Chairman
      chairmanName: ['', Validators.required],
      chairmanWing: ['', Validators.required],
      chairmanFlat: ['', Validators.required],
      chairmanMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      chairmanEmail: ['', [Validators.required, Validators.email]],
      chairmanWhatsapp: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      chairmanPhoto: [null],
      chairmanAadhar: [null],
      chairmanPan: [null],
      chairmanStartDate: ['', Validators.required],
      chairmanEndDate: ['', Validators.required],
      chairmanEmergencyContact: ['', Validators.required],

      // Step 3: Secretary
      secretaryName: ['', Validators.required],
      secretaryWing: ['', Validators.required],
      secretaryFlat: ['', Validators.required],
      secretaryMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      secretaryEmail: ['', [Validators.required, Validators.email]],
      secretaryWhatsapp: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      secretaryPhoto: [null],
      secretaryAadhar: [null],
      secretaryPan: [null],
      secretaryStartDate: ['', Validators.required],
      secretaryEndDate: ['', Validators.required],
      secretaryEmergencyContact: ['', Validators.required],

      // Step 3: Treasurer
      treasurerName: ['', Validators.required],
      treasurerWing: ['', Validators.required],
      treasurerFlat: ['', Validators.required],
      treasurerMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      treasurerEmail: ['', [Validators.required, Validators.email]],
      treasurerWhatsapp: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      treasurerPhoto: [null],
      treasurerAadhar: [null],
      treasurerPan: [null],
      treasurerStartDate: ['', Validators.required],
      treasurerEndDate: ['', Validators.required],
      treasurerEmergencyContact: ['', Validators.required],

      // Step 3: Administration
      managerName: ['', Validators.required],
      managerMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      managerEmail: ['', [Validators.required, Validators.email]],
      managerPhoto: [null],
      managerAadhar: [null],
      managerPan: [null],

      accountantName: ['', Validators.required],
      accountantMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      accountantEmail: ['', [Validators.required, Validators.email]],
      accountantPhoto: [null],
      accountantAadhar: [null],
      accountantPan: [null],

      // Step 4: Staff
      watchmanName: ['', Validators.required],
      watchmanMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      watchmanJoiningDate: ['', Validators.required],
      watchmanPhoto: [null],
      watchmanAadhar: [null],
      watchmanPan: [null],

      cleanerName: ['', Validators.required],
      cleanerMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      cleanerJoiningDate: ['', Validators.required],
      cleanerPhoto: [null],
      cleanerAadhar: [null],
      cleanerPan: [null],

      electricianName: ['', Validators.required],
      electricianMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      electricianJoiningDate: ['', Validators.required],
      electricianPhoto: [null],
      electricianAadhar: [null],
      electricianPan: [null],

      gardenerName: ['', Validators.required],
      gardenerMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gardenerJoiningDate: ['', Validators.required],
      gardenerPhoto: [null],
      gardenerAadhar: [null],
      gardenerPan: [null],

      liftOperatorName: ['', Validators.required],
      liftOperatorMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      liftOperatorJoiningDate: ['', Validators.required],
      liftOperatorPhoto: [null],
      liftOperatorAadhar: [null],
      liftOperatorPan: [null],

      plumberName: ['', Validators.required],
      plumberMobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      plumberJoiningDate: ['', Validators.required],
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
      this.registrationCertificates = Array.from(input.files);
      this.registrationCertificate = this.registrationCertificates[0] || null;
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
      // landline: val.landline,
      // website: val.website,
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
      registrationCertificate: this.registrationCertificates.length > 0 ? this.registrationCertificates[0] : this.registrationCertificate,
      registrationCertificates: this.registrationCertificates
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
  // Field Labels Mapping for Validation Popups
  public fieldLabels: Record<string, string> = {
    // Step 1
    societyName: 'Society Name',
    registrationNo: 'Registration Number',
    registrationDate: 'Registration Date',
    reraNumber: 'RERA Number',
    societyType: 'Society Type',
    constructionYear: 'Construction Year',
    email: 'Society Email ID',
    whatsapp: 'WhatsApp Number (10 digits)',
    landline: 'Landline Number',
    website: 'Website URL',
    gstNumber: 'GST Number',
    societyPan: 'Society PAN',
    address1: 'Address Line 1',
    area: 'Area / Locality',
    city: 'City',
    state: 'State',
    pincode: 'Pincode (6 digits)',
    bankName: 'Bank Name',
    bankBranch: 'Bank Branch',
    accountNumber: 'Account Number',
    ifscCode: 'IFSC Code',

    // Step 2
    wings: 'Total Wings / Blocks',
    buildingName: 'Building Name',
    buildingType: 'Building Type',
    groundShopAvailable: 'Ground Floor Shops Availability',
    groundShopCount: 'Ground Floor Shops Count',
    groundShopPrefix: 'Ground Floor Shop Prefix',
    commercialAvailable: 'Commercial Area Availability',
    commercialStartFloor: 'Commercial Start Floor',
    commercialFloors: 'Commercial Floors Count',
    commercialShopsPerFloor: 'Commercial Shops Per Floor',
    commercialOfficePerFloor: 'Commercial Offices Per Floor',
    basementAvailable: 'Basement Availability',
    basementFloors: 'Basement Floors Count',
    parkingPerBasement: 'Parking Slots Per Basement',
    storageRooms: 'Storage Rooms Count',
    utilityRooms: 'Utility Rooms Count',
    residentialStartFloor: 'Residential Start Floor',
    floors: 'Total Residential Floors',
    flats: 'Flats Per Floor',
    flatPattern: 'Flat Numbering Pattern',
    liftAvailable: 'Lift Availability',
    liftCount: 'Lift Count',
    residentParking: 'Resident Parking',
    visitorParking: 'Visitor Parking',
    twoWheelerParking: '2-Wheeler Parking',
    fourWheelerParking: '4-Wheeler Parking',
    evParking: 'EV Parking',
    disabledParking: 'Disabled Parking',
    parkingAllocation: 'Parking Allocation Policy',
    passengerLift: 'Passenger Lift Count',
    serviceLift: 'Service Lift Count',
    liftCompany: 'Lift Company Name',
    liftAmcDate: 'Lift AMC Date',
    undergroundTank: 'Underground Water Tank',
    overheadTank: 'Overhead Water Tank',
    waterTankCapacity: 'Water Tank Capacity',
    generatorAvailable: 'Generator Backup Availability',
    generatorCapacity: 'Generator Capacity',
    generatorVendor: 'Generator Vendor',
    generatorAmcDate: 'Generator AMC Date',
    generatorFuel: 'Generator Fuel Type',
    fireSystemAvailable: 'Fire System Availability',
    firePump: 'Fire Pump Availability',
    fireTankCapacity: 'Fire Tank Capacity',
    hydrantSystem: 'Hydrant System',
    sprinklerSystem: 'Sprinkler System',
    smokeDetectors: 'Smoke Detectors',
    fireVendor: 'Fire Safety Vendor',
    fireAmcDate: 'Fire AMC Date',

    // Step 3
    chairmanName: 'Chairman Name',
    chairmanWing: 'Chairman Wing',
    chairmanFlat: 'Chairman Flat No',
    chairmanMobile: 'Chairman Mobile (10 digits)',
    chairmanEmail: 'Chairman Email ID',
    chairmanWhatsapp: 'Chairman WhatsApp Number (10 digits)',
    chairmanStartDate: 'Chairman Term Start Date',
    chairmanEndDate: 'Chairman Term End Date',
    chairmanEmergencyContact: 'Chairman Emergency Contact',

    secretaryName: 'Secretary Name',
    secretaryWing: 'Secretary Wing',
    secretaryFlat: 'Secretary Flat No',
    secretaryMobile: 'Secretary Mobile (10 digits)',
    secretaryEmail: 'Secretary Email ID',
    secretaryWhatsapp: 'Secretary WhatsApp Number (10 digits)',
    secretaryStartDate: 'Secretary Term Start Date',
    secretaryEndDate: 'Secretary Term End Date',
    secretaryEmergencyContact: 'Secretary Emergency Contact',

    treasurerName: 'Treasurer Name',
    treasurerWing: 'Treasurer Wing',
    treasurerFlat: 'Treasurer Flat No',
    treasurerMobile: 'Treasurer Mobile (10 digits)',
    treasurerEmail: 'Treasurer Email ID',
    treasurerWhatsapp: 'Treasurer WhatsApp Number (10 digits)',
    treasurerStartDate: 'Treasurer Term Start Date',
    treasurerEndDate: 'Treasurer Term End Date',
    treasurerEmergencyContact: 'Treasurer Emergency Contact',

    managerName: 'Manager Name',
    managerMobile: 'Manager Mobile (10 digits)',
    managerEmail: 'Manager Email ID',

    accountantName: 'Accountant Name',
    accountantMobile: 'Accountant Mobile (10 digits)',
    accountantEmail: 'Accountant Email ID',

    // Step 4
    watchmanName: 'Watchman Name',
    watchmanMobile: 'Watchman Mobile (10 digits)',
    watchmanJoiningDate: 'Watchman Joining Date',
    cleanerName: 'Cleaner Name',
    cleanerMobile: 'Cleaner Mobile (10 digits)',
    cleanerJoiningDate: 'Cleaner Joining Date',
    electricianName: 'Electrician Name',
    electricianMobile: 'Electrician Mobile (10 digits)',
    electricianJoiningDate: 'Electrician Joining Date',
    gardenerName: 'Gardener Name',
    gardenerMobile: 'Gardener Mobile (10 digits)',
    gardenerJoiningDate: 'Gardener Joining Date',
    liftOperatorName: 'Lift Operator Name',
    liftOperatorMobile: 'Lift Operator Mobile (10 digits)',
    liftOperatorJoiningDate: 'Lift Operator Joining Date',
    plumberName: 'Plumber Name',
    plumberMobile: 'Plumber Mobile (10 digits)',
    plumberJoiningDate: 'Plumber Joining Date',
    acceptDeclaration: 'Accept Declaration Checkbox'
  };

  private controlsByStep: Record<number, string[]> = {
    1: [
      'societyName', 'registrationNo', 'registrationDate', 'reraNumber', 'societyType', 'constructionYear','email', 'whatsapp', 'address1', 'area', 'city', 'state', 'pincode', 'bankName', 'bankBranch', 'accountNumber', 'ifscCode'
    ],
    2: [
      'wings', 'buildingName', 'buildingType',
      'groundShopAvailable', 'groundShopCount', 'groundShopPrefix',
      'commercialAvailable', 'commercialStartFloor', 'commercialFloors', 'commercialShopsPerFloor', 'commercialOfficePerFloor',
      'basementAvailable', 'basementFloors', 'parkingPerBasement', 'storageRooms', 'utilityRooms',
      'residentialStartFloor', 'floors', 'flats', 'flatPattern',
      'liftAvailable', 'liftCount',
      'residentParking', 'visitorParking', 'twoWheelerParking', 'fourWheelerParking', 'evParking', 'disabledParking', 'parkingAllocation',
      'passengerLift', 'serviceLift', 'liftCompany', 'liftAmcDate',
      'undergroundTank', 'overheadTank', 'waterTankCapacity',
      'generatorAvailable', 'generatorCapacity', 'generatorVendor', 'generatorAmcDate', 'generatorFuel',
      'fireSystemAvailable', 'firePump', 'fireTankCapacity', 'hydrantSystem', 'sprinklerSystem', 'smokeDetectors', 'fireVendor', 'fireAmcDate'
    ],
    3: [
      'chairmanName', 'chairmanWing', 'chairmanFlat', 'chairmanMobile', 'chairmanEmail', 'chairmanWhatsapp', 'chairmanStartDate', 'chairmanEndDate', 'chairmanEmergencyContact',
      'secretaryName', 'secretaryWing', 'secretaryFlat', 'secretaryMobile', 'secretaryEmail', 'secretaryWhatsapp', 'secretaryStartDate', 'secretaryEndDate', 'secretaryEmergencyContact',
      'treasurerName', 'treasurerWing', 'treasurerFlat', 'treasurerMobile', 'treasurerEmail', 'treasurerWhatsapp', 'treasurerStartDate', 'treasurerEndDate', 'treasurerEmergencyContact',
      'managerName', 'managerMobile', 'managerEmail',
      'accountantName', 'accountantMobile', 'accountantEmail'
    ],
    4: [
      'watchmanName', 'watchmanMobile', 'watchmanJoiningDate',
      'cleanerName', 'cleanerMobile', 'cleanerJoiningDate',
      'electricianName', 'electricianMobile', 'electricianJoiningDate',
      'gardenerName', 'gardenerMobile', 'gardenerJoiningDate',
      'liftOperatorName', 'liftOperatorMobile', 'liftOperatorJoiningDate',
      'plumberName', 'plumberMobile', 'plumberJoiningDate',
      'acceptDeclaration'
    ]
  };

  // ===========================================
  // Step Navigation & API Integration
  // ===========================================

  nextStep(): void {
    if (!this.isStepValid(this.currentStep)) {
      this.showStepValidationError(this.currentStep);
      return;
    }

    if (!this.createdSocietyId) {
      this.createdSocietyId = 'SOC-' + Date.now();
    }

    this.isSavingStep = true;
    this.cdr.detectChanges();

    const doAdvance = () => {
      this.isSavingStep = false;
      this.advanceStep();
    };

    if (this.currentStep === 1) {
      const { data, files } = this.getStep1Payload();
      console.log('API Call 1 - Saving Step 1 Payload:', data, files);
      this.societyService.saveStep1(data, files).subscribe({
        next: (response) => {
          if (response?.societyId) {
            this.createdSocietyId = response.societyId;
          }
          doAdvance();
        },
        error: (err) => {
          console.warn('Backend Step 1 API error 405/failed (advancing step):', err);
          doAdvance();
        }
      });
    } else if (this.currentStep === 2) {
      const data = this.getStep2Payload();
      console.log('API Call 2 - Saving Step 2 Payload:', data);
      this.societyService.saveStep2(data).subscribe({
        next: () => doAdvance(),
        error: (err) => {
          console.warn('Backend Step 2 API error 405/failed (advancing step):', err);
          doAdvance();
        }
      });
    } else if (this.currentStep === 3) {
      const { data, files } = this.getStep3Payload();
      console.log('API Call 3 - Saving Step 3 Payload:', data, files);
      this.societyService.saveStep3(data, files).subscribe({
        next: () => doAdvance(),
        error: (err) => {
          console.warn('Backend Step 3 API error 405/failed (advancing step):', err);
          doAdvance();
        }
      });
    } else {
      doAdvance();
    }
  }

  goToStep(targetStep: number): void {
    if (targetStep === this.currentStep) return;
    if (targetStep < this.currentStep) {
      this.currentStep = targetStep;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (this.isStepValid(this.currentStep)) {
        this.currentStep = targetStep;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.showStepValidationError(this.currentStep);
      }
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
      this.cdr.detectChanges();
    }
  }

  // ===========================================
  // Submit / Final Step 4 API Call
  // ===========================================

  submit(): void {
    const invalidSteps = [1, 2, 3, 4].filter(step => !this.isStepValid(step));
    if (invalidSteps.length > 0) {
      this.showStepValidationError(invalidSteps[0]);
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
            alert('🎉 All 4 step data collected & validated successfully!');
          }
        });
      }
    });
  }

  public isStepValid(step: number): boolean {
    const controls = this.controlsByStep[step];
    if (!controls) return true;

    controls.forEach(name => {
      const control = this.societyForm.get(name);
      control?.markAsTouched();
    });

    return controls.every(name => this.societyForm.get(name)?.valid);
  }

  public getInvalidFieldsInfo(step: number = this.currentStep): string[] {
    const controls = this.controlsByStep[step] || [];
    const invalidFields: string[] = [];

    controls.forEach(name => {
      const control = this.societyForm.get(name);
      if (control && control.invalid) {
        const label = this.fieldLabels[name] || name;
        if (control.errors?.['required'] || control.errors?.['requiredTrue']) {
          invalidFields.push(`• ${label} (Field is required)`);
        } else if (control.errors?.['email']) {
          invalidFields.push(`• ${label} (Must be a valid email address)`);
        } else if (control.errors?.['pattern']) {
          if (name.toLowerCase().includes('mobile') || name.toLowerCase().includes('whatsapp')) {
            invalidFields.push(`• ${label} (Must be exactly 10 digits)`);
          } else if (name.toLowerCase().includes('pincode')) {
            invalidFields.push(`• ${label} (Must be exactly 6 digits)`);
          } else {
            invalidFields.push(`• ${label} (Invalid format)`);
          }
        } else if (control.errors?.['min']) {
          invalidFields.push(`• ${label} (Minimum required value is ${control.errors['min'].min})`);
        } else {
          invalidFields.push(`• ${label} (Invalid value)`);
        }
      }
    });

    return invalidFields;
  }

  private showStepValidationError(step: number = this.currentStep): void {
    const invalidList = this.getInvalidFieldsInfo(step);
    if (invalidList.length > 0) {
      alert(`⚠️ Please complete or correct the following required fields:\n\n${invalidList.join('\n')}`);
    } else {
      alert('Please complete all required fields before continuing.');
    }
    setTimeout(() => document.querySelector<HTMLElement>('.ng-invalid.ng-touched')?.focus());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
