/**
 * Step 1: Society Information, Address, Documents & Bank Details
 */
export interface SocietyStep1Model {
  // Basic Information
  societyName: string;
  registrationNo: string;
  registrationDate: string;
  societyType: 'Residential' | 'Commercial' | 'Mixed';
  constructionYear: number | string;
  builder?: string;
  email: string;
  whatsapp: string;
  landline?: string;
  website?: string;
  description?: string;

  // Society Documents & Registration Metadata
  gstNumber?: string;
  societyPan?: string;
  reraNumber?: string;

  // Address Details
  address1: string;
  address2?: string;
  area?: string;
  city: string;
  state: string;
  pincode: string;

  // Bank Account Details
  bankName?: string;
  bankBranch?: string;
  accountNumber?: string;
  ifscCode?: string;
  upiId?: string;
}

export interface SocietyStep1Files {
  societyLogo?: File | null;
  registrationCertificate?: File | null;
}
