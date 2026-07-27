/**
 * Step 4: Society Staff Details, Review & Final Declaration
 */
export interface StaffMemberDetails {
  name?: string;
  mobile?: string;
  joiningDate?: string;
}

export interface SocietyStep4Model {
  societyId?: string;

  // Watchman
  watchmanName?: string;
  watchmanMobile?: string;
  watchmanJoiningDate?: string;

  // Cleaner
  cleanerName?: string;
  cleanerMobile?: string;
  cleanerJoiningDate?: string;

  // Electrician
  electricianName?: string;
  electricianMobile?: string;
  electricianJoiningDate?: string;

  // Gardener
  gardenerName?: string;
  gardenerMobile?: string;
  gardenerJoiningDate?: string;

  // Lift Operator
  liftOperatorName?: string;
  liftOperatorMobile?: string;
  liftOperatorJoiningDate?: string;

  // Plumber
  plumberName?: string;
  plumberMobile?: string;
  plumberJoiningDate?: string;

  // Declaration
  acceptDeclaration: boolean;
}

export interface SocietyStep4Files {
  watchmanPhoto?: File | null;
  watchmanAadhar?: File | null;
  watchmanPan?: File | null;

  cleanerPhoto?: File | null;
  cleanerAadhar?: File | null;
  cleanerPan?: File | null;

  electricianPhoto?: File | null;
  electricianAadhar?: File | null;
  electricianPan?: File | null;

  gardenerPhoto?: File | null;
  gardenerAadhar?: File | null;
  gardenerPan?: File | null;

  liftOperatorPhoto?: File | null;
  liftOperatorAadhar?: File | null;
  liftOperatorPan?: File | null;

  plumberPhoto?: File | null;
  plumberAadhar?: File | null;
  plumberPan?: File | null;
}
