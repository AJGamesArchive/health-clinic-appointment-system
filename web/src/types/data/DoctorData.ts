// Imports
import { DoctorUpcomingAppointments } from "./UpcomingAppointmentData";

/**
 * Type to define the full data object of a Doctor user
 */
type DoctorData = {
  specialty: string;
  upcomingAppointments: DoctorUpcomingAppointments[];
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

/**
 * Type to define the full data object of a Doctor user
 */
export type PatientViewDoctor = {
  specialty: string;
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

export default DoctorData;