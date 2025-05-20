// Imports
import { DoctorUpcomingAppointments } from "./UpcomingAppointmentData";

/**
 * Type to define the full data object of a Doctor user
 */
type DoctorData = {
  specialty: string;
  upcomingAppointments: DoctorUpcomingAppointments[];
  workingHours: DoctorWorkingHours[];
  contactInfo: DoctorContactInfo;
};

export type DoctorWorkingHours = {
  day: string;
  startTime: string;
  endTime: string;
};

export type DoctorContactInfo = {
  workEmail: string;
  workPhone: string;
};

/**
 * Type to define the full data object of a Doctor user
 */
export type PatientViewDoctor = {
  specialty: string;
  workingHours: DoctorWorkingHours[];
  contactInfo: DoctorContactInfo;
};

export default DoctorData;