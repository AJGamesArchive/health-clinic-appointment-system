//TODO Update Logical Schema to remove the "oneOf" keys and co. Choose one of the prided data sets in those sections and remove others.

/**
 * This file contains the types that are used in the logical schema of the database
 * These types are used to define the structure of the data in the database
 * All types with the prefix 'DB_' represent individual collections in the database
 * The notation '() => { _id: string}' is used to represent MongoDBs ObjectId type - used as primary and foreign keying
 * All the 'Date' types are representing a timestamp as a date ISO string
 * @note //! There are attributes on this schema that are missing on the ERD
 */

type DB_Account = {
  _id: () => { _id: string};
  title: string; //? Moved here instead of being in patient and doctor separately
  forenames: string; //? New
  surname: string; //? Changed from name to surname
  email: string;
  password: string;
  role: 'Patient' | 'Doctor' | 'Admin';
  createdAt: Date;
  updatedAt: Date;
  accountData: PatientData | DoctorData | AdminData;
};

/**
 * @note The core Appointments objects are currently their own collection as I figured you'd primarily need to query for all upcoming appointments to check for available time slots - copies of static appointment data are stored in the Doctor and Patient objects for quick access
 */
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

/**
 * @note In it's own collection due to the file size limits imposed by MongoDB and so data driven people can query all medical history for stats etc
 */
type DB_MedicalHistory = {
  _id: () => { _id: string};
  patient: {
    patientId: () => { _id: string};
    name: string;
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
  medicalInformation: { //? This would be the patents current statuses, however, an entry could be made for these in Medical History to ensure past statuses are kept?
    bloodType: string;
    sexAtBirth: string;
    conditions: string[];
    allergies: string[];
  };
  lifeStyleHistory: LifeStyleFactors;
  importantNotes: string[]; 
};

//TODO Work out how to represent nullability on the JSON LDS
//? Ensure these changes are correct on ER model
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
  TODO Check all of the below with group!!!
*/
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
    notes: string;TODO
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