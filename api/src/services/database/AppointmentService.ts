// Imports
import DB_Appointments from "../../models/Appointments.js";
import DB_Accounts from "../../models/Accounts.js";
import AppointmentData from "../../types/data/AppointmentData.js";

/**
 * Service class to handel all appointment database operations
 * @AJGamesArchive
 */
abstract class AppointmentService {
  /**
   * @protected async function to save an appointment to the database as a new document
   * @param appointmentData - The appointment data to save
   * @returns ID of created document, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async save(appointmentData: AppointmentData): Promise<string | number> {
    // Reject creation if document already exists
    if(appointmentData.id) return 409;

    // DB Opts
    try {
      const appointment = new DB_Appointments(appointmentData);
      const document = await appointment.save();
      return document._id.toString();
    } catch (err: any) {
      console.error(`Error creating appointment document: ${err}`);
      return 500;
    };
  };

  /**
   * @protected async function to update an appointment in the database
   * @param appointmentData - The appointment data to update
   * @returns The old document data BEFORE updates were applied, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async update(appointmentData: AppointmentData): Promise<AppointmentData | number> {
    // Reject update if document does not exist
    if(!appointmentData.id) return 404;

    // DB Opts
    try {
      const originalDocument = await DB_Appointments.findByIdAndUpdate(appointmentData.id, appointmentData);
      if(!originalDocument) return 404;
      return {
        id: originalDocument._id.toString(),
        doctorId: originalDocument.doctorId,
        patientId: originalDocument.patientId,
        upcoming: originalDocument.upcoming,
        canceled: originalDocument.canceled,
        date: originalDocument.date,
        time: originalDocument.time,
        bookedBy: originalDocument.bookedBy,
        bookedAt: originalDocument.bookedAt,
        updatedAt: originalDocument.updatedAt,
        vitals: (originalDocument.vitals) ? {
          height: originalDocument.vitals.height ?? undefined,
          weight: originalDocument.vitals.weight ?? undefined,
          bloodPressure: originalDocument.vitals.bloodPressure ?? undefined,
          heartRate: originalDocument.vitals.heartRate ?? undefined,
          temperature: originalDocument.vitals.temperature ?? undefined
        } : undefined,
        preAppointmentNotes: originalDocument.preAppointmentNotes,
        actionsTaken: originalDocument.actionsTaken,
        previousAppointmentId: originalDocument.previousAppointmentId ?? undefined,
        nextAppointmentId: originalDocument.nextAppointmentId ?? undefined,
        postAppointmentNotes: originalDocument.postAppointmentNotes
      };
    } catch (err: any) {
      console.error(`Error updating appointment document: ${err}`);
      return 500;
    };
  };
};

export default AppointmentService;