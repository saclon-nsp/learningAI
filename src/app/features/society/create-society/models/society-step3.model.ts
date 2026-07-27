/**
 * Step 3: Managing Committee Members & Administrative Personnel
 */
export interface CommitteeMemberDetails {
  fullName: string;
  wing: string;
  flatNo: string;
  mobile: string;
  email: string;
  whatsapp?: string;
  startDate: string;
  endDate?: string;
  emergencyContact?: string;
}

export interface AdminPersonnelDetails {
  fullName?: string;
  mobile?: string;
  email?: string;
}

export interface SocietyStep3Model {
  societyId?: string;

  // Chairman Details
  chairmanName: string;
  chairmanWing: string;
  chairmanFlat: string;
  chairmanMobile: string;
  chairmanEmail: string;
  chairmanWhatsapp?: string;
  chairmanStartDate: string;
  chairmanEndDate?: string;
  chairmanEmergencyContact?: string;

  // Secretary Details
  secretaryName: string;
  secretaryWing: string;
  secretaryFlat: string;
  secretaryMobile: string;
  secretaryEmail: string;
  secretaryWhatsapp?: string;
  secretaryStartDate: string;
  secretaryEndDate?: string;
  secretaryEmergencyContact?: string;

  // Treasurer Details
  treasurerName: string;
  treasurerWing: string;
  treasurerFlat: string;
  treasurerMobile: string;
  treasurerEmail: string;
  treasurerWhatsapp?: string;
  treasurerStartDate: string;
  treasurerEndDate?: string;
  treasurerEmergencyContact?: string;

  // Society Manager Details
  managerName?: string;
  managerMobile?: string;
  managerEmail?: string;

  // Accountant Details
  accountantName?: string;
  accountantMobile?: string;
  accountantEmail?: string;
}

export interface SocietyStep3Files {
  chairmanPhoto?: File | null;
  chairmanAadhar?: File | null;
  chairmanPan?: File | null;

  secretaryPhoto?: File | null;
  secretaryAadhar?: File | null;
  secretaryPan?: File | null;

  treasurerPhoto?: File | null;
  treasurerAadhar?: File | null;
  treasurerPan?: File | null;

  managerPhoto?: File | null;
  managerAadhar?: File | null;
  managerPan?: File | null;

  accountantPhoto?: File | null;
  accountantAadhar?: File | null;
  accountantPan?: File | null;
}
