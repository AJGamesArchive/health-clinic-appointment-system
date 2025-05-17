// Imports
import LifeStyleFactors from "./LifeStyleFactors";
import { PatientUpcomingAppointments } from "./UpcomingAppointmentData";

/**
 * Type to define the full data object of an Patient user
 */
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
  upcomingAppointments: PatientUpcomingAppointments[];
  medicalInformation: { //? This would be the patents current statuses, however, an entry could be made for these in Medical History to ensure past statuses are kept?
    bloodType: string;
    sexAtBirth: string;
    conditions: string[];
    allergies: string[];
  };
  lifeStyleHistory: LifeStyleFactors;
  importantNotes: string[]; 
};

export default PatientData;