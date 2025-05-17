type MedicalHistoryDetails =
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

type LabTestResults = {
  tests: {
    testName: string;
    result: string;
    resultsDate: Date;
    requestedBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
  }[];
};

type Diagnoses = {
  diagnoses: {
    condition: string;
    notes: string;
    severity: string;
    date: Date;
    diagnosedBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
  }[];
};

type DietaryRestrictions = {
  dietaryRestrictions: {
    restriction: string;
    notes: string;
    date: Date;
    prescribedBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
  }[];
};

type Allergies = {
  allergies: {
    allergen: string;
    reaction: string;
    severity: string;
    notes: string;
    date: Date;
  }[];
};

type ChronicConditions = {
  conditions: {
    condition: string;
    dateDiagnosed: Date;
    severity: string;
    notes: string;
    diagnosedBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
  }[];
};

type PastSurgeries = {
  surgeries: {
    surgery: string;
    emergency: boolean;
    date: Date;
    notes: string;
    performedBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    }[];
  }[];
};

type Vaccines = {
  vaccines: {
    vaccine: string;
    dateAdministered: Date;
    notes: string;
  }[];
};

type Medications = {
  medications: {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate: Date | null; //? null if current
    prescribedBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
    prescribedDate: Date;
    refills: number;
    notes: string;
  }[];
};

type Treatments = {
  treatments: {
    treatment: string;
    schedule: {
      dateAdministered: Date;
    } | {
      startDate: Date;
      endDate: Date;
    };
    administeredBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
    dosage: string;
    reason: string;
    notes: string;
  }[];
};

type Referrals = {
  referrals: {
    referralTo: string;
    dateReferred: Date;
    reason: string;
    referredBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
    status: 'Pending' | 'Completed' | 'Declined';
    followUpDate: Date | null; //? null if no follow up needed
    followUpNotes: string;
    followUpBy: {
      doctorId: () => { _id: string};
      doctorName: string;
    };
    notes: string;
  }[];
};

export default MedicalHistoryDetails