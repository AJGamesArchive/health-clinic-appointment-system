// Imports
import { DoctorUpcomingAppointments } from "./UpcomingAppointmentData.js";

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

export default DoctorData;