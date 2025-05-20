// Imports
import AccountRoles from "./AccountRoles";

/**
 * Type to define the object of full appointment data
 * @AJGamesArchive
 */
type AppointmentData = {
  id: string | null;
  doctorId: string;
  patientId: string;
  upcoming: boolean;
  canceled: boolean;
  date: string;
  time: string;
  bookedBy: AccountRoles;
  bookedAt?: Date;
  updatedAt?: Date;
  vitals?: {
    height?: string;
    weight?: string;
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
  };
  preAppointmentNotes: string;
  actionsTaken: string;
  previousAppointmentId?: string;
  nextAppointmentId?: string;
  postAppointmentNotes: string;
};

export default AppointmentData;