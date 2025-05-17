/**
 * Type to define the data stored for upcoming appointments
 * @note Account ID & Account Name are a doctor account when stored in patient and a patient account when stored in doctor
 * @AJGamesArchive
 */
type UpcomingAppointmentData = {
  appointmentId: string;
  date: string;
  time: string;
  accountId: string;
  accountName: string;
};

/**
 * Type to define the patient upcoming appointments array
 */
export type PatientUpcomingAppointments = {
  appointmentId: string;
  date: string;
  time: string;
  doctorId: string;
  doctorName: string;
};

/**
 * Type to define the doctor upcoming appointments array
 */
export type DoctorUpcomingAppointments = {
  appointmentId: string;
  date: string;
  time: string;
  patientId: string;
  patientName: string;
};

export default UpcomingAppointmentData;