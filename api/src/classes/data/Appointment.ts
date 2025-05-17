// Imports
import mongoose from "mongoose";
import AppointmentService from "../../services/database/AppointmentService.js";
import AppointmentData from "../../types/data/AppointmentData.js";
import AccountRoles from "../../types/data/AccountRoles.js";

/**
 * Class to represent an appointment
 * @AJGamesArchive
 */
class Appointment extends AppointmentService {
  // Data Props
  private id: string | null;
  public doctorId: string;
  public patientId: string;
  public upcoming: boolean;
  public canceled: boolean;
  public date: string;
  public time: string;
  public bookedBy: AccountRoles;
  private bookedAt?: Date;
  private updatedAt?: Date;
  public vitals?: {
    height?: string;
    weight?: string;
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
  };
  public preAppointmentNotes: string;
  public actionsTaken: string;
  public previousAppointmentId?: string;
  public nextAppointmentId?: string;
  public postAppointmentNotes: string;

  // Utility props
  private errors: string[] = [];

  // Constructor
  constructor(data: AppointmentData) {
    super();
    this.id = data.id;
    this.doctorId = data.doctorId;
    this.patientId = data.patientId;
    this.upcoming = data.upcoming;
    this.canceled = data.canceled;
    this.date = data.date;
    this.time = data.time;
    this.bookedBy = data.bookedBy;
    this.bookedAt = data.bookedAt;
    this.updatedAt = data.updatedAt;
    this.vitals = data.vitals;
    this.preAppointmentNotes = data.preAppointmentNotes;
    this.actionsTaken = data.actionsTaken;
    this.previousAppointmentId = data.previousAppointmentId;
    this.nextAppointmentId = data.nextAppointmentId;
    this.postAppointmentNotes = data.postAppointmentNotes;
  };

  /**
   * @public function to get the appointment ID
   * @returns ID or null
   */
  public getId(): string | null {
    return this.id;
  };

  /**
   * @public function to get the appointment errors
   * @returns Array of errors
   */
  public getErrors(): string[] {
    return this.errors;
  };

  /**
   * @public function to return the appointment data as JSON
   * @returns JSON object of appointment data
   */
  public toJSON(): AppointmentData {
    return {
      id: this.id,
      doctorId: this.doctorId,
      patientId: this.patientId,
      upcoming: this.upcoming,
      canceled: this.canceled,
      date: this.date,
      time: this.time,
      bookedBy: this.bookedBy,
      bookedAt: this.bookedAt,
      updatedAt: this.updatedAt,
      vitals: this.vitals,
      preAppointmentNotes: this.preAppointmentNotes,
      actionsTaken: this.actionsTaken,
      previousAppointmentId: this.previousAppointmentId,
      nextAppointmentId: this.nextAppointmentId,
      postAppointmentNotes: this.postAppointmentNotes
    };
  };


  /**
   * @public async function to save the appointment data to the database as a new document
   * @param session - Optional mongoose session to run the operation in
   * @returns true if the data was saved successfully, false if the data failed to save
   * @AJGamesArchive
   */
  public async createDoc(session?: mongoose.mongo.ClientSession): Promise<boolean> {
    // Trigger DB insert
    const appointmentId: string | number = await super.save({
      ...this.toJSON(),
      id: null,
    }, session);

    // Handle result
    if(typeof appointmentId === "number") {
      if(appointmentId === 409) this.errors.push("Appointment data might already exist.");
      else this.errors.push("An unexpected error occurred while trying to save appointment data.");
      return false;
    };

    // Save result
    this.id = appointmentId;
    const timestamp = new Date();
    this.bookedAt = timestamp;
    this.updatedAt = timestamp;
    return true;
  };

  /**
   * @public async function to update the existing appointment data to the database
   * @param session - Optional mongoose session to run the operation in
   * @returns true if the data was saved successfully, false if the data failed to save
   * @AJGamesArchive
   */
  public async updateDoc(session?: mongoose.mongo.ClientSession): Promise<boolean> {
    // Trigger DB update
    const oldAppointment: AppointmentData | number = await super.update(this.toJSON(), session);

    // Handle result
    if(typeof oldAppointment === "number") {
      this.errors.push("An unexpected error occurred while trying to update appointment data.");
      return false;
    };

    // Save result
    this.updatedAt = new Date();
    return true;
  };

  /**
   * @public async function to delete the appointment data from the database
   * @param session - Optional mongoose session to run the operation in
   * @returns The deleted appointment data, otherwise returns error status code
   * @AJGamesArchive
   */
  public async deleteDoc(session?: mongoose.mongo.ClientSession): Promise<AppointmentData | number> {
    // Ensure ID is not null
    if(!this.id) {
      this.errors.push("No ID loaded");
      return 400;
    };

    // Trigger DB delete
    const result: AppointmentData | number = await super.delete(this.id, session);

    // Handle result
    if(!result) {
      this.errors.push("An unexpected error occurred while trying to delete appointment data.");
      return 500;
    };

    // Save result
    this.id = null;
    return result;
  };
};

export default Appointment;
