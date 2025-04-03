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
  name: string; //? Moved here instead of being in all 3 account data types
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
  actionsTaken: string; //? Ensure this is translated to ERD
  previousAppointmentId?: () => { _id: string}; //? Ensure this is translated to ERD
  nextAppointmentId?: () => { _id: string}; //? Ensure this is translated to ERD
  postAppointmentNotes: string;
};

/**
 * @note In it's own collection due to the file size limits imposed by MongoDB and so data driven people can query all medical history for stats etc
 */
type DB_MedicalRecords = {
  _id: () => { _id: string};
  patient: {
    patientId: () => { _id: string};
    name: string;
  };
  createdBy: {
    doctorId: () => { _id: string};
    doctorName: string;
  };
  createdAt: Date;
  updatedAt: Date;
  details: undefined; //! This is a placeholder for the medical records data
};

type AdminData = {
  staffRole: string;
};

type DoctorData = {
  _id: () => { _id: string};
  title: string;
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
  _id: () => { _id: string};
  title: string;
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
    county?: string
    state?: string;
    country: string;
    postCode?: string;
    zipCode?: string;
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
    smokingStatus: string | null;
    alcoholConsumption: string | null;
    recreationalDrugUse: string | null;
    exerciseFrequency: string | null;
    conditions: string[];
    allergies: string[];
    currentMedications: string[];
    dietaryRestrictions: string[];
  };
  importantNotes: string[]; //? Add this to ERD - This is for things like; homelessness, language barriers, criminal, aggressive tendencies, etc...
};
