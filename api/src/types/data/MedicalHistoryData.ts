/**
 * Type to define the lab test results entry details data structures
 */
type LabTestResults = {
  testName: string;
  result: string;
  resultsDate: Date;
  requestedBy: {
    doctorId: string;
    doctorName: string;
  };
};

/**
 * Type to define the lab test results entry details data structures
 */
type Diagnoses = {
  condition: string;
  notes: string;
  severity: string;
  date: Date;
  diagnosedBy: {
    doctorId: string;
    doctorName: string;
  };
};

/**
 * Type to define the dietary restrictions entry details data structures
 */
type DietaryRestrictions = {
  restriction: string;
  notes: string;
  date: Date;
  prescribedBy: {
    doctorId: string;
    doctorName: string;
  };
};

/**
 * Type to define the allergies entry details data structures
 */
type Allergies = {
  allergen: string;
  reaction: string;
  severity: string;
  notes: string;
  date: Date;
};

/**
 * Type to define the chronic conditions entry details data structures
 */
type ChronicConditions = {
  condition: string;
  dateDiagnosed: Date;
  severity: string;
  notes: string;
  diagnosedBy: {
    doctorId: string;
    doctorName: string;
  };
};

/**
 * Type to define the past surgeries entry details data structures
 */
type PastSurgeries = {
  surgery: string;
  emergency: boolean;
  date: Date;
  notes: string;
  performedBy: {
    doctorId: string;
    doctorName: string;
  }[];
};

/**
 * Type to define the vaccines entry details data structures
 */
type Vaccines = {
  vaccine: string;
  dateAdministered: Date;
  notes: string;
};

/**
 * Type to define the medications entry details data structures
 */
type Medications = {
  medication: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date | null;
  prescribedBy: {
    doctorId: string;
    doctorName: string;
  };
  prescribedDate: Date;
  refills: number;
  notes: string;
};

/**
 * Type to define the treatment entry details data structures
 */
type Treatments = {
  treatment: string;
  schedule: {
    dateAdministered: Date;
    endDate: Date;
  };
  administeredBy: {
    doctorId: string;
    doctorName: string;
  };
  dosage: string;
  reason: string;
  notes: string;
};

/**
 * Type to define the referral entry details data structures
 */
type Referrals = {
  referralTo: string;
  dateReferred: Date;
  reason: string;
  referredBy: {
    doctorId: string;
    doctorName: string;
  };
  status: 'Pending' | 'Completed' | 'Declined';
  followUpDate: Date | undefined;
  followUpNotes: string | undefined;
  followUpBy: {
    doctorId: string;
    doctorName: string;
  } | undefined;
  notes: string;
};

/**
 * Type to define the medical history entry details data structures
 */
type MedicalHistoryDetails = {
  type:
    'LabTestResults' |
    'Diagnoses' |
    'DietaryRestrictions' |
    'Allergies' |
    'ChronicConditions' |
    'PastSurgeries' |
    'Vaccines' |
    'Medications' |
    'Treatments' |
    'Referrals';
} &
  LabTestResults |
  Diagnoses |
  DietaryRestrictions |
  Allergies |
  ChronicConditions |
  PastSurgeries |
  Vaccines |
  Medications |
  Treatments |
  Referrals
;

/**
 * Type to define the core medical history data object
 */
type MedicalHistoryData = {
  id: string | null;
  patient: {
    patientId: string;
    patientName: string;
  };
  entryBy: {
    doctorId: string;
    doctorName: string;
  };
  createdAt: Date;
  updatedAt: Date;
  details: MedicalHistoryDetails[];
};

export default MedicalHistoryData;
export {
  LabTestResults,
  Diagnoses,
  DietaryRestrictions,
  Allergies,
  ChronicConditions,
  PastSurgeries,
  Vaccines,
  Medications,
  Treatments,
  Referrals,
  MedicalHistoryDetails,
}