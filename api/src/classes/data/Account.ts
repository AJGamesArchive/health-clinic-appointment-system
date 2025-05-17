// Imports
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import saltRounds from "../../static/SaltRounds.js";
import AccountRoles from "../../types/data/AccountRoles.js";
import AccountData from "../../types/data/AccountData.js";
import PatientData from "../../types/data/PatientData.js";
import DoctorData from "../../types/data/DoctorData.js";
import AdminData from "../../types/data/AdminData.js";
import AccountService from "../../services/database/AccountService.js";
import UpcomingAppointmentData, {
  PatientUpcomingAppointments,
  DoctorUpcomingAppointments,
} from "../../types/data/UpcomingAppointmentData.js";

/**
 * Class to represent an users account data
 * @AJGamesArchive
 */
class Account extends AccountService {
  // Data props
  private id: string | null;
  public title: string;
  public forenames: string;
  public surname: string;
  public email: string;
  public password: string | null; // Should be null unless a new password is being passed
  public role: AccountRoles;
  private createdAt?: Date;
  private updatedAt?: Date;

  // Embedded props - split up programmatically to allow safer typing
  private patientData?: PatientData;
  private doctorData?: DoctorData;
  private adminData?: AdminData;

  // Flag props
  private errors: string[] = [];

  // Constructor
  constructor(data: AccountData) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.forenames = data.forenames;
    this.surname = data.surname;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.patientData = data.patientData;
    this.doctorData = data.doctorData;
    this.adminData = data.adminData;
    return;
  };

  /**
   * @public function to return any errors that have occurred
   * @returns an array of errors, empty if no errors have occurred
   * @AJGamesArchive
   */
  public getErrors(): string[] {
    return this.errors;
  };

  /**
   * @public async function to hash the account password
   * @returns true if the password was hashed successfully, false if the password failed to hash, null if no password is loaded
   * @AJGamesArchive
   */
  public async hashPassword(): Promise<boolean | null> {
    // Check if appropriate data is present
    if(!this.password) {
      this.errors.push("No password loaded");
      return null;
    };

    // Hash password
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
      return true;
    } catch (err: any) {
      this.errors.push(`Failed to hash password: ${err}`);
      return false;
    };
  };

  /**
   * @public function to return the account ID
   * @returns the account ID, null if no ID is present
   * @AJGamesArchive
   */
  public getID(): string | null {
    return this.id;
  };

  /**
   * @public function to return the account as a JSON object
   * @returns the account as a JSON object
   * @AJGamesArchive
   */
  public toJSON(): AccountData {
    return {
      id: this.id,
      title: this.title,
      forenames: this.forenames,
      surname: this.surname,
      email: this.email,
      password: null,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      patientData: this.patientData,
      doctorData: this.doctorData,
      adminData: this.adminData,
    };
  };

  /**
   * @public function to update the account patient data
   * @param data the new patient data to set
   * @AJGamesArchive
   */
  public setPatientData(data: PatientData): void {
    this.patientData = data;
    return;
  };

  /**
   * @public function to update the account doctor data
   * @param data the new doctor data to set
   * @AJGamesArchive
   */
  public setDoctorData(data: DoctorData): void {
    this.doctorData = data;
    return;
  };

  /**
   * @public function to update the account admin data
   * @param data the new admin data to set
   * @AJGamesArchive
   */
  public setAdminData(data: AdminData): void {
    this.adminData = data;
    return;
  };

  /**
   * @public async function to save the account data to the database as a new document
   * @param session - Optional mongoose session to run the operation in
   * @returns true if the data was saved successfully, false if the data failed to save
   * @AJGamesArchive
   */
  public async createDoc(session?: mongoose.mongo.ClientSession): Promise<boolean> {
    // Trigger DB insert
    const result: AccountData | number = await super.save({
      id: null,
      title: this.title,
      forenames: this.forenames,
      surname: this.surname,
      email: this.email,
      password: this.password,
      role: this.role,
      patientData: this.patientData,
      doctorData: this.doctorData,
      adminData: this.adminData,
    }, session);

    // Handle result
    if(typeof result === "number") {
      if(result === 409) this.errors.push("Email already in use.");
      else this.errors.push("An unexpected error occurred while trying to save account data.");
      return false;
    };

    // Save result
    this.id = result.id;
    this.password = null;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    return true;
  };

  /**
   * @public async function to update the existing account data to the database
   * @param session - Optional mongoose session to run the operation in
   * @returns true if the data was saved successfully, false if the data failed to save
   * @AJGamesArchive
   */
  public async updateDoc(session?: mongoose.mongo.ClientSession): Promise<boolean> {
    // Trigger DB update
    const result: AccountData | number = await super.update({
      id: this.id,
      title: this.title,
      forenames: this.forenames,
      surname: this.surname,
      email: this.email,
      password: this.password,
      role: this.role,
      patientData: this.patientData,
      doctorData: this.doctorData,
      adminData: this.adminData,
    }, session);

    // Handle result
    if(typeof result === "number") {
      if(result === 409) this.errors.push("Email already in use.");
      else this.errors.push("An unexpected error occurred while trying to update account data.");
      return false;
    };

    // Save result
    this.password = null;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    return true;
  };

  /**
   * @public async function to delete the account data from the database
   * @param session - Optional mongoose session to run the operation in
   * @returns true if the data was deleted successfully, false if the data failed to delete
   * @AJGamesArchive
   */
  public async deleteDoc(session?: mongoose.mongo.ClientSession): Promise<boolean> {
    // Ensure ID is not null
    if(!this.id) {
      this.errors.push("No ID loaded");
      return false;
    };

    // Trigger DB delete
    const result: boolean = await super.delete(this.id, session);

    // Handle result
    if(!result) {
      this.errors.push("An unexpected error occurred while trying to delete account data.");
      return false;
    };

    // Save result
    this.id = null;
    return true;
  };

  /**
   * @public function to add an upcoming appointment to embedded patient or doctor data
   * @param appointment the appointment to add
   * @returns Returns true if the appointment was added successfully, false if the appointment failed to add
   * @note Function will fail if account is Admin or if embedded data is not present
   * @AJGamesArchive
   */
  public addAppointment(appointment: UpcomingAppointmentData): boolean {
    switch(this.role) {
      case "Patient":
        if(!this.patientData) return false;
        this.patientData.upcomingAppointments.push({
          appointmentId: appointment.appointmentId,
          date: appointment.date,
          time: appointment.time,
          doctorId: appointment.accountId,
          doctorName: appointment.accountName,
        });
        return true;
      case "Doctor":
        if(!this.doctorData) return false;
        this.doctorData.upcomingAppointments.push({
          appointmentId: appointment.appointmentId,
          date: appointment.date,
          time: appointment.time,
          patientId: appointment.accountId,
          patientName: appointment.accountName,
        });
        return true;
      default:
        return false;
    };
  };

  /**
   * @public function to remove an upcoming appointment by id
   * @param appointmentId the appointment ID to remove
   * @returns Returns true if the appointment was removed successfully, false if the appointment failed to remove
   * @note Function will fail if account is Admin or if embedded data is not present
   * @AJGamesArchive
   */
  public removeAppointment(appointmentId: string): boolean {
    switch(this.role) {
      case "Patient":
        if(!this.patientData) return false;
        this.patientData.upcomingAppointments = this.patientData.upcomingAppointments.filter(
          (appointment) => appointment.appointmentId !== appointmentId
        );
        return true;
      case "Doctor":
        if(!this.doctorData) return false;
        this.doctorData.upcomingAppointments = this.doctorData.upcomingAppointments.filter(
          (appointment) => appointment.appointmentId !== appointmentId
        );
        return true;
      default:
        return false;
    };
  };

  /**
   * @public function to update an upcoming appointment by appointment ID
   * @param appointment the new appointment data to set
   * @returns Returns true if the appointment was updated successfully, false if the appointment failed to update
   * @note Function will fail if account is Admin or if embedded data is not present
   * @note Function will fail if the appointment ID does not exist in the account data
   * @AJGamesArchive
   */
  public updateAppointment(appointment: UpcomingAppointmentData): boolean {
    switch(this.role) {
      case "Patient":
        if(!this.patientData) return false;
        const patientIndex: number = this.patientData.upcomingAppointments.findIndex(
          (app) => app.appointmentId === appointment.appointmentId
        );
        if(patientIndex === -1) return false;
        this.patientData.upcomingAppointments[patientIndex] = {
          appointmentId: appointment.appointmentId,
          date: appointment.date,
          time: appointment.time,
          doctorId: appointment.accountId,
          doctorName: appointment.accountName,
        };
        return true;
      case "Doctor":
        if(!this.doctorData) return false;
        const doctorIndex: number = this.doctorData.upcomingAppointments.findIndex(
          (app) => app.appointmentId === appointment.appointmentId
        );
        if(doctorIndex === -1) return false;
        this.doctorData.upcomingAppointments[doctorIndex] = {
          appointmentId: appointment.appointmentId,
          date: appointment.date,
          time: appointment.time,
          patientId: appointment.accountId,
          patientName: appointment.accountName,
        };
        return true;
      default:
        return false;
    };
  };

  /**
   * @public function to fetch the array of upcoming appointments
   * @returns Returns the array of upcoming appointments, or null if the account is an admin or if the embedded data is not present
   */
  public getUpcomingAppointments():
    PatientUpcomingAppointments[] |
    DoctorUpcomingAppointments[] |
    null
  {
    switch(this.role) {
      case "Patient":
        if(!this.patientData) return null;
        return this.patientData.upcomingAppointments;
      case "Doctor":
        if(!this.doctorData) return null;
        return this.doctorData.upcomingAppointments;
      default:
        return null;
    };
  };
};

export default Account;