type DB_Account = {
  _id: () => { _id: string};
  title: string;
  forenames: string;
  surname: string;
  email: string;
  password: string;
  role: 'Patient' | 'Doctor' | 'Admin';
  createdAt: Date;
  updatedAt: Date;
  accountData: PatientData | DoctorData | AdminData;
};

type DB_Appointment = {
  _id: () => { _id: string};
  doctorId: () => { _id: string};
  patientId: () => { _id: string};
  upcoming: boolean;
  canceled: boolean;
  date: string;
  time: string;
  bookedBy: 'Doctor' | 'Patient' | 'Admin';
  bookedAt: Date;
  updatedAt: Date;
  vitals?: {
    height?: string;
    weight?: string;
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
  };
  preAppointmentNotes: string;
  actionsTaken: string;
  previousAppointmentId?: () => { _id: string};
  nextAppointmentId?: () => { _id: string};
  postAppointmentNotes: string;
};

type DB_MedicalHistory = {
  _id: () => { _id: string};
  patient: {
    patientId: () => { _id: string};
    patientName: string;
  };
  entryBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
  createdAt: Date;
  updatedAt: Date;
  details: MedicalHistoryDetails[];
};

type AdminData = {
  staffRole: string;
};

type DoctorData = {
  specialty: string;
  upcomingAppointments: {
    appointmentId: () => { _id: string};
    date: string;
    time: string;
    patientId: () => { _id: string};
    patientName: string;
  }[];
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  contactInfo: {
    workEmail: string;
    workPhone: string;
  };
};

type PatientData = {
  gender: string;
  dateOfBirth: Date;
  contactInfo: {
    email: string;
    phone: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  }[];
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    county: string
    postCode: string;
  };
  upcomingAppointments: {
    appointmentId: () => { _id: string};
    date: string;
    time: string;
    doctorId: () => { _id: string};
    doctorName: string;
  }[];
  medicalInformation: {
    bloodType: string;
    sexAtBirth: string;
    conditions: string[];
    allergies: string[];
  };
  lifeStyleHistory: LifeStyleFactors;
  importantNotes: string[]; 
};

type LifeStyleFactors = {
  smokingStatus: {
    status: string;
    statusAsOf: Date;
    notes: string;
  }[] | null;
  alcoholConsumption: {
    consumption: string;
    consumptionAsOf: Date;
    notes: string;
  }[] | null;
  recreationalDrugUse: {
    drug: string;
    usage: string;
    useAsOf: Date;
    notes: string;
  }[] | null;
  exerciseFrequency:{
    exercise: string;
    frequency: string;
    frequencyAsOf: Date;
    notes: string;
  }[] | null;
  sleepQuality:{
    quality: string;
    qualityAsOf: Date;
    notes: string;
  }[] | null;
  stressLevel: {
    level: string;
    levelAsOf: Date;
    notes: string;
  }[] | null;
  socialSupport: {
    support: string;
    supportAsOf: Date;
    notes: string;
  }[] | null;
  travelHistory: {
    location: string;
    date: Date;
    duration: string;
    notes: string;
  }[] | null;
  familyConditionals: {
    condition: string;
    typicalCause: string;
    typicalAgeOfDiagnosis: number;
    notes: string;
  }[] | null;
  environmentalFactors: {
    factor: string;
    exposure: string;
    exposureAsOf: Date;
    notes: string;
  }[] | null;
};

/*
  * Medical History Embeds
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

type LabTestResults = {
  testName: string;
  result: string;
  resultsDate: Date;
  requestedBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
};

type Diagnoses = {
  condition: string;
  notes: string;
  severity: string;
  date: Date;
  diagnosedBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
};

type DietaryRestrictions = {
  restriction: string;
  notes: string;
  date: Date;
  prescribedBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
};

type Allergies = {
  allergen: string;
  reaction: string;
  severity: string;
  notes: string;
  date: Date;
};

type ChronicConditions = {
  condition: string;
  dateDiagnosed: Date;
  severity: string;
  notes: string;
  diagnosedBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
};

type PastSurgeries = {
  surgery: string;
  emergency: boolean;
  date: Date;
  notes: string;
  performedBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  }[];
};

type Vaccines = {
  vaccine: string;
  dateAdministered: Date;
  notes: string;
};

type Medications = {
  medication: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date | null;
  prescribedBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
  prescribedDate: Date;
  refills: number;
  notes: string;
};

type Treatments = {
  treatment: string;
  schedule: {
    dateAdministered: Date;
    endDate: Date;
  };
  administeredBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
  dosage: string;
  reason: string;
  notes: string;
};

type Referrals = {
  referralTo: string;
  dateReferred: Date;
  reason: string;
  referredBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
  status: 'Pending' | 'Completed' | 'Declined';
  followUpDate: Date | undefined;
  followUpNotes: string | undefined;
  followUpBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  } | undefined;
  notes: string;
};