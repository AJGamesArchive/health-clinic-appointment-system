// Imports
import mongoose from "mongoose";
import DB_Appointments from "../../models/Appointments.js";
import AppointmentData from "../../types/data/AppointmentData.js";
import AccountRoles from "../../types/data/AccountRoles.js";

/**
 * Service class to handel all appointment database operations
 * @AJGamesArchive
 */
abstract class AppointmentService {
  /**
   * @protected async function to save an appointment to the database as a new document
   * @param appointmentData - The appointment data to save
   * @param session - Optional mongoose session to run the operation in
   * @returns ID of created document, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async save(
    appointmentData: AppointmentData,
    session?: mongoose.mongo.ClientSession,
  ): Promise<string | number> {
    // Reject creation if document already exists
    if(appointmentData.id) return 409;

    // DB Opts
    try {
      // Start transaction
      const appointment = new DB_Appointments(appointmentData);
      const document = await appointment.save({ session });
      return document._id.toString();
    } catch (err: any) {
      console.error(`Error creating appointment document: ${err}`);
      return 500;
    };
  };

  /**
   * @protected async function to update an appointment in the database
   * @param appointmentData - The appointment data to update
   * @param session - Optional mongoose session to run the operation in
   * @returns The old document data BEFORE updates were applied, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async update(
    appointmentData: AppointmentData,
    session?: mongoose.mongo.ClientSession,
  ): Promise<AppointmentData | number> {
    // Reject update if document does not exist
    if(!appointmentData.id) return 404;

    // DB Opts
    try {
      const originalDocument = await DB_Appointments.findByIdAndUpdate(appointmentData.id, {
        ...appointmentData,
        updatedAt: new Date(),
      }, { session });
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

  /**
   * @protected async function to delete an appointment in the database
   * @param appointmentId - The appointment ID to delete
   * @param session - Optional mongoose session to run the operation in
   * @returns The deleted document data, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async delete(
    appointmentId: string,
    session?: mongoose.mongo.ClientSession,
  ): Promise<AppointmentData | number> {
    // DB Opts
    try {
      const deletedDocument = await DB_Appointments.findByIdAndDelete(appointmentId, { session });
      if(!deletedDocument) return 404;
      return {
        id: deletedDocument._id.toString(),
        doctorId: deletedDocument.doctorId,
        patientId: deletedDocument.patientId,
        upcoming: deletedDocument.upcoming,
        canceled: deletedDocument.canceled,
        date: deletedDocument.date,
        time: deletedDocument.time,
        bookedBy: deletedDocument.bookedBy,
        bookedAt: deletedDocument.bookedAt,
        updatedAt: deletedDocument.updatedAt,
        vitals: (deletedDocument.vitals) ? {
          height: deletedDocument.vitals.height ?? undefined,
          weight: deletedDocument.vitals.weight ?? undefined,
          bloodPressure: deletedDocument.vitals.bloodPressure ?? undefined,
          heartRate: deletedDocument.vitals.heartRate ?? undefined,
          temperature: deletedDocument.vitals.temperature ?? undefined
        } : undefined,
        preAppointmentNotes: deletedDocument.preAppointmentNotes,
        actionsTaken: deletedDocument.actionsTaken,
        previousAppointmentId: deletedDocument.previousAppointmentId ?? undefined,
        nextAppointmentId: deletedDocument.nextAppointmentId ?? undefined,
        postAppointmentNotes: deletedDocument.postAppointmentNotes
      };
    } catch (err: any) {
      console.error(`Error deleting appointment document: ${err}`);
      return 500;
    };
  };

  /**
   * @static async function to get an appointment from the database
   * @param id - The appointment ID to get
   * @returns An appointment data object, otherwise returns error status code
   * @AJGamesArchive
   */
  static async getOne(id: string): Promise<AppointmentData | number> {
    // Ensure required data is present
    if(!id) return 400;

    // DB opts
    try {
      // Get document
      const document = await DB_Appointments.findById(id);

      // Handle silent failure
      if(!document) return 404; // Not Found

      // Map updated document
      const appointment: AppointmentData = {
        id: document._id.toString(),
        doctorId: document.doctorId,
        patientId: document.patientId,
        upcoming: document.upcoming,
        canceled: document.canceled,
        date: document.date,
        time: document.time,
        bookedBy: document.bookedBy,
        bookedAt: document.bookedAt,
        updatedAt: document.updatedAt,
        vitals: (document.vitals) ? {
          height: document.vitals.height ?? undefined,
          weight: document.vitals.weight ?? undefined,
          bloodPressure: document.vitals.bloodPressure ?? undefined,
          heartRate: document.vitals.heartRate ?? undefined,
          temperature: document.vitals.temperature ?? undefined
        } : undefined,
        preAppointmentNotes: document.preAppointmentNotes,
        actionsTaken: document.actionsTaken,
        previousAppointmentId: document.previousAppointmentId ?? undefined,
        nextAppointmentId: document.nextAppointmentId ?? undefined,
        postAppointmentNotes: document.postAppointmentNotes
      };

      // Return account class
      return appointment;
    } catch (err: any) {
      console.error(`Failed to get account:\n\n${err}`);
      return 500; // Internal Server Error
    };
  };

  /**
   * @static function to fetch all appointments that match given criteria for a given user from the database
   * @param userType - The type of user to fetch appointments for
   * @param userId - The ID of the user to fetch appointments for
   * @param type - The type of appointments to fetch
   * @param page - The page number to fetch
   * @param limit - The number of appointments to fetch per page
   * @param sort - The sort order to fetch appointments in
   * @returns An array of appointment data objects, otherwise returns error status code
   * @AJGamesArchive
   */
  static async getManyByUserId(
    userType: "Patient" | "Doctor",
    userId: string,
    type: 'upcoming' | 'past' | 'all' | 'cancelled',
    page: number,
    limit: number,
    sort: string,
  ): Promise<AppointmentData[] | number> {
    // Ensure required data is present
    if(!userId) return 400;

    // DB opts
    try {
      // Get documents
      const documents = await DB_Appointments
        .find({
          [userType.toLowerCase() + 'Id']: userId,
          ...(type !== 'all' && { upcoming: type === 'upcoming' }),
          ...(type !== 'all' && { canceled: type === 'cancelled' }),
        })
        .sort({ date: sort === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      // Handle silent failure
      if(!documents) return 404; // Not Found

      // Map updated document
      const appointments: AppointmentData[] = documents.map((document) => ({
        id: document._id.toString(),
        doctorId: document.doctorId,
        patientId: document.patientId,
        upcoming: document.upcoming,
        canceled: document.canceled,
        date: document.date,
        time: document.time,
        bookedBy: document.bookedBy,
        bookedAt: document.bookedAt,
        updatedAt: document.updatedAt,
        vitals: (document.vitals) ? {
          height: document.vitals.height ?? undefined,
          weight: document.vitals.weight ?? undefined,
          bloodPressure: document.vitals.bloodPressure ?? undefined,
          heartRate: document.vitals.heartRate ?? undefined,
          temperature: document.vitals.temperature ?? undefined
        } : undefined,
        preAppointmentNotes: document.preAppointmentNotes,
        actionsTaken: document.actionsTaken,
        previousAppointmentId: document.previousAppointmentId ?? undefined,
        nextAppointmentId: document.nextAppointmentId ?? undefined,
        postAppointmentNotes: document.postAppointmentNotes
      }));

      // Return appointments
      return appointments;
    } catch (err: any) {
      console.error(`Failed to get account:\n\n${err}`);
      return 500; // Internal Server Error
    };
  };

  /**
   * @static function to fetch specific appointment for a given user data based on a given appointment ID
   * @param accountType - The type of user to fetch appointment for
   * @param appointmentId - The ID of the appointment to fetch
   * @param accountId - The ID of the user to fetch appointment for
   * @returns An appointment data object, otherwise returns error status code
   * @AJGamesArchive
   */
  static async getOneForAccount(
    accountType: AccountRoles,
    appointmentId: string,
    accountId: string
  ): Promise<AppointmentData | number> {
    // DB Opts
    try {
      // Fetch document
      const document = await DB_Appointments.findOne({
        id: appointmentId,
        [accountType.toLowerCase() + 'Id']: accountId,
      });

      // handle soft errors
      if(!document) return 404; // Not Found

      // Map document output
      const appointment: AppointmentData = {
        id: document._id.toString(),
        doctorId: document.doctorId,
        patientId: document.patientId,
        upcoming: document.upcoming,
        canceled: document.canceled,
        date: document.date,
        time: document.time,
        bookedBy: document.bookedBy,
        bookedAt: document.bookedAt,
        updatedAt: document.updatedAt,
        vitals: (document.vitals) ? {
          height: document.vitals.height ?? undefined,
          weight: document.vitals.weight ?? undefined,
          bloodPressure: document.vitals.bloodPressure ?? undefined,
          heartRate: document.vitals.heartRate ?? undefined,
          temperature: document.vitals.temperature ?? undefined
        } : undefined,
        preAppointmentNotes: document.preAppointmentNotes,
        actionsTaken: document.actionsTaken,
        previousAppointmentId: document.previousAppointmentId ?? undefined,
        nextAppointmentId: document.nextAppointmentId ?? undefined,
        postAppointmentNotes: document.postAppointmentNotes
      };
      
      // Return account class
      return appointment;
    } catch (err: any) {
      console.error(`Failed to get appointment:\n\n${err}`);
      return 500; // Internal Server Error
    };
  };
};

export default AppointmentService;