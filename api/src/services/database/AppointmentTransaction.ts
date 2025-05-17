// Imports
import mongoose from "mongoose";
import { merge } from "lodash";
import Appointment from "../../classes/data/Appointment.js";
import AppointmentData from "../../types/data/AppointmentData.js";
import Account from "../../classes/data/Account.js";
import AccountService from "./AccountService.js";
import AppointmentService from "./AppointmentService.js";
import AccountData from "../../types/data/AccountData.js";
import UpcomingAppointmentData from "../../types/data/UpcomingAppointmentData.js";

/**
 * Class to handle all DB appointment & account upcoming appointment operations atomically
 * @notes Create => init, apply, commit
 * @notes Update => init, queue, apply, commit
 * @notes Delete => init, apply, commit
 * @notes All operations are atomic and will rollback if any errors occur
 * @notes All operations are queued in memory and will not be saved to the database until commit is called & succeeds
 * @example
 * // Create an appointment & edit account upcoming appointments
 * const transaction = await AppointmentTransaction.initCreateTransaction(appointmentId);
 * await transaction.applyTransaction();
 * const result = await transaction.commitTransaction();
 * 
 * // Update an appointment & edit account upcoming appointments
 * const transaction = await AppointmentTransaction.initAmendTransaction(operation, newAppointment);
 * transaction.queueUpdates(updates);
 * await transaction.applyTransaction();
 * const result = await transaction.commitTransaction();
 * 
 * // Delete an appointment & edit account upcoming appointments
 * const transaction = await AppointmentTransaction.initAmendTransaction(appointmentId);
 * await transaction.applyTransaction();
 * const result = await transaction.commitTransaction();
 * @AJGamesArchive
 */
class AppointmentTransaction {
  // Data Props
  private operation: "Create" | "Update" | "Delete";
  private appointment: Appointment;
  private doctor: Account;
  private patient: Account;

  // Queued update props
  private updatedAppointment: Appointment | null = null;
  private newDoctor: Account | null = null;
  private newPatient: Account | null = null;

  // Utility props
  private errors: string[] = [];

  // Constructor
  private constructor(
    operation: "Create" | "Update" | "Delete",
    appointment: Appointment,
    doctor: Account,
    patient: Account,
  ) {
    this.operation = operation;
    this.appointment = appointment;
    this.doctor = doctor;
    this.patient = patient;
  };

  /**
    @static async function to prepare an appointment create transaction
    @param newAppointment - The new appointment data
    @returns TransactionAppointment object, or error status code
    @note This function is used to initiate a transaction for creating an appointment
    @AJGamesArchive
   */
    static async initCreateTransaction(
      newAppointment: AppointmentData,
    ): Promise<AppointmentTransaction | number> {
      // Retrieve required documents
      let doctor: Account | undefined;
      let patient: Account | undefined;
      try {
        const promises = [
          AccountService.getOne(newAppointment.doctorId),
          AccountService.getOne(newAppointment.patientId),
        ];
        const accounts = await Promise.all(promises);
        if(typeof accounts[0] !== 'number') doctor = new Account(accounts[0]);
        if(typeof accounts[1] !== 'number') patient = new Account(accounts[1]);
      } catch (err: any) {
        console.error(`Error preparing transaction: ${err}`);
        return 500;
      };

      // Ensure accounts were retrieved
      if(!doctor || !patient) return 422;

      // Create appointment object
      const appointment = new Appointment(newAppointment);

      // Create transaction object
      const transaction = new AppointmentTransaction(
        "Create",
        appointment,
        doctor,
        patient,
      );

      // Return transaction
      return transaction;
    };
  
    /**
     *@static async function to prepare an update or delete transaction
      @param operation 
      @param appointmentId - The appointment ID to delete
      @returns TransactionAppointment object, or null
      @note This function is used to initiate a transaction for updating or deleting an appointment
      @AJGamesArchive
     */
    static async initAmendTransaction(
      operation: "Update" | "Delete",
      appointmentId: string,
    ): Promise<AppointmentTransaction | number> {
      // Retrieve required documents
      let appointment: Appointment | undefined;
      let doctor: Account | undefined;
      let patient: Account | undefined;

      // DB Opts
      try {
        // Retrieve appointment
        const appointmentData: AppointmentData | number = await AppointmentService.getOne(appointmentId);
        if(typeof appointmentData === 'number') throw new Error(`Failed to retrieve appointment data.\n\n${appointmentData}`);
        appointment = new Appointment(appointmentData);

        // Retrieve patient & doctor
        const promises = [
          AccountService.getOne(appointmentData.doctorId),
          AccountService.getOne(appointmentData.patientId),
        ];
        const accounts = await Promise.all(promises);
        if(typeof accounts[0] !== 'number') doctor = new Account(accounts[0]);
        if(typeof accounts[1] !== 'number') patient = new Account(accounts[1]);
      } catch (err: any) {
        console.error(`Error preparing transaction: ${err}`);
        return 500;
      };

      // Ensure accounts were retrieved
      if(!doctor || !patient || !appointment) return 404;

      // Create transaction object
      const transaction = new AppointmentTransaction(
        operation,
        appointment,
        doctor,
        patient,
      );

      // Return transaction
      return transaction;
    };

    /**
     * @public function to queue the updates to be made on an update transaction
     * @param updates - The updates to be made
     * @returns true if the updates were queued successfully, false if the updates failed to set
     * @AJGamesArchive
     */
    public queueUpdates(updates: Partial<AppointmentData>): boolean {
      // Ensure the transaction is an update
      if(this.operation !== "Update") {
        this.errors.push("Cannot queue updates for non-update transaction.");
        return false;
      };

      // Update appointment data
      this.updatedAppointment = new Appointment(merge(this.appointment.toJSON(), updates));
      return true;
    };

    /**
     * @private async function to apply a create transaction in memory
     * @returns true if the transaction was successful, false if the transaction failed
     * @AJGamesArchive
     */
    private async applyCreateTransaction(): Promise<boolean> {
      // Transaction check
      if(this.operation !== "Create") {
        this.errors.push(`Cannot apply create transaction to ${this.operation} transaction.`);
        return false;
      };

      // Apply transaction
      this.updatedAppointment = this.appointment;
      return true;
    };

    /**
     * @private async function to apply an update transaction in memory
     * @returns true if the transaction was successful, false if the transaction failed
     * @AJGamesArchive
     */
    private async applyUpdateTransaction(): Promise<boolean> {
      // Transaction check
      if(this.operation !== "Update") {
        this.errors.push(`Cannot apply update transaction to ${this.operation} transaction.`);
        return false;
      };

      // Ensure appointment is present
      if(!this.updatedAppointment) {
        this.errors.push("Cannot update appointment without queued updates.");
        return false;
      };

      // Ensure ID is present
      const id: string | null = this.appointment.getId();
      if(!id) {
        this.errors.push("Cannot update appointment without ID.");
        return false;
      };
      
      // Apply transaction
      // Fetch new accounts if required
      const promises: Promise<(number | AccountData)>[] = [];
      const newPatient: boolean = (this.appointment.patientId !== this.updatedAppointment.patientId)
      const newDoctor: boolean = (this.appointment.doctorId !== this.updatedAppointment.doctorId)
      if(newPatient) promises.push(
        AccountService.getOne(this.updatedAppointment.patientId),
      );
      if(newDoctor) promises.push(
        AccountService.getOne(this.updatedAppointment.doctorId),
      );
      const accounts: (number | AccountData)[] = await Promise.all(promises);

      // Ensure accounts were retrieved
      const newPatientData: AccountData | number = accounts[0];
      if(typeof newPatientData === 'number') {
        this.errors.push(`Failed to retrieve new patient account.\n\n${newPatient}`);
        return false;
      };
      this.newPatient = new Account(newPatientData);
      const newDoctorData: AccountData | number = accounts[1];
      if(typeof newDoctorData === 'number') {
        this.errors.push(`Failed to retrieve new doctor account.\n\n${newDoctor}`);
        return false;
      };
      this.newDoctor = new Account(newDoctorData);

      // Define upcoming appointment data
      const patientUpcoming: UpcomingAppointmentData = {
        appointmentId: id,
        date: this.updatedAppointment.date,
        time: this.updatedAppointment.time,
        accountId: this.updatedAppointment.doctorId,
        accountName: (newDoctor && this.newDoctor) ?
          `${this.newDoctor.forenames} ${this.newDoctor.surname}` :
          `${this.doctor.forenames} ${this.doctor.surname}`,
      };
      const doctorUpcoming: UpcomingAppointmentData = {
        appointmentId: id,
        date: this.updatedAppointment.date,
        time: this.updatedAppointment.time,
        accountId: this.updatedAppointment.patientId,
        accountName: (newPatient && this.newPatient) ?
          `${this.newPatient.forenames} ${this.newPatient.surname}` :
          `${this.patient.forenames} ${this.patient.surname}`,
      };

      // Update patient account(s)
      if(newPatient) {
        // Remove appointment from old patient account if required
        const oldPatientHas: boolean = this.patient.hasAppointment(id);
        if(oldPatientHas) {
          const patientRemoved: boolean = this.patient.removeAppointment(id);
          if(!patientRemoved) {
            this.errors.push("Failed to remove appointment from old patient account.");
            return false;
          };
        };

        // Add appointment to new patient account if required
        if(this.updatedAppointment.upcoming) {
          const patientAdded: boolean = this.newPatient.addAppointment(patientUpcoming);
          if(!patientAdded) {
            this.errors.push("Failed to add appointment to new patient account.");
            return false;
          };
        };
      } else {
        // Remove, add or update appointment from patient account
        const patientHas: boolean = this.patient.hasAppointment(id);
        if(this.updatedAppointment.upcoming) {
          if(patientHas) {
            // Update appointment in patient account
            const patientUpdated: boolean = this.patient.updateAppointment(patientUpcoming);
            if(!patientUpdated) {
              this.errors.push("Failed to update appointment in patient account.");
              return false;
            };
          } else {
            // Add appointment to patient account
            const patientAdded: boolean = this.patient.addAppointment(patientUpcoming);
            if(!patientAdded) {
              this.errors.push("Failed to add appointment to patient account.");
              return false;
            };
          };
        } else {
          if(patientHas) {
            // Remove appointment from patient account
            const patientRemoved: boolean = this.patient.removeAppointment(id);
            if(!patientRemoved) {
              this.errors.push("Failed to remove appointment from patient account.");
              return false;
            };
          };
        };
      };

      // Update doctor account(s)
      if(newDoctor) {
        // Remove appointment from old doctor account if required
        const oldDoctorHas: boolean = this.doctor.hasAppointment(id);
        if(oldDoctorHas) {
          const doctorRemoved: boolean = this.doctor.removeAppointment(id);
          if(!doctorRemoved) {
            this.errors.push("Failed to remove appointment from old doctor account.");
            return false;
          };
        };

        // Add appointment to new doctor account if required
        if(this.updatedAppointment.upcoming) {
          const doctorAdded: boolean = this.newDoctor.addAppointment(doctorUpcoming);
          if(!doctorAdded) {
            this.errors.push("Failed to add appointment to new doctor account.");
            return false;
          };
        };
      } else {
        // Remove, add or update appointment from doctor account
        const doctorHas: boolean = this.doctor.hasAppointment(id);
        if(this.updatedAppointment.upcoming) {
          if(doctorHas) {
            // Update appointment in doctor account
            const doctorUpdated: boolean = this.doctor.updateAppointment(doctorUpcoming);
            if(!doctorUpdated) {
              this.errors.push("Failed to update appointment in doctor account.");
              return false;
            };
          } else {
            // Add appointment to doctor account
            const doctorAdded: boolean = this.doctor.addAppointment(doctorUpcoming);
            if(!doctorAdded) {
              this.errors.push("Failed to add appointment to doctor account.");
              return false;
            };
          };
        } else {
          if(doctorHas) {
            // Remove appointment from doctor account
            const doctorRemoved: boolean = this.doctor.removeAppointment(id);
            if(!doctorRemoved) {
              this.errors.push("Failed to remove appointment from doctor account.");
              return false;
            };
          };
        };
      };

      // Return confirmation
      return true;
    };

    /**
     * @private async function to apply a delete transaction in memory
     * @returns true if the transaction was successful, false if the transaction failed
     * @AJGamesArchive
     */
    private async applyDeleteTransaction(): Promise<boolean> {
      // Transaction check
      if(this.operation !== "Delete") {
        this.errors.push(`Cannot apply delete transaction to ${this.operation} transaction.`);
        return false;
      };

      // Ensure ID is present
      const id: string | null = this.appointment.getId();
      if(!id) {
        this.errors.push("Cannot delete appointment without ID.");
        return false;
      };

      // Apply transaction
      const inPatient: boolean = this.patient.hasAppointment(id);
      const inDoctor: boolean = this.doctor.hasAppointment(id);
      if(inPatient) {
        const patientRemoved: boolean = this.patient.removeAppointment(id);
        if(!patientRemoved) {
          this.errors.push("Failed to remove appointment from patient.");
          return false;
        };
      };
      if(inDoctor) {
        const doctorRemoved: boolean = this.doctor.removeAppointment(id);
        if(!doctorRemoved) {
          this.errors.push("Failed to remove appointment from doctor.");
          return false;
        };
      };
      return true;
    };

    /**
     * @public async function to apply the prepared transaction
     * @AJGamesArchive
     */
    public async applyTransaction(): Promise<boolean> {
      if(this.operation === "Create") return await this.applyCreateTransaction();
      if(this.operation === "Update") return await this.applyUpdateTransaction();
      if(this.operation === "Delete") return await this.applyDeleteTransaction();
      return false;
    };

  /**
   * @public async function to atomically commit all appointment and account changes to the database
   * @returns true if the transaction was successful, false if the transaction failed
   * @AJGamesArchive
   */
  public async commitTransaction(): Promise<boolean> {
    // Ensure the transaction is valid
    if(this.operation !== "Delete" && !this.updatedAppointment) {
      this.errors.push("Cannot commit transaction without updated appointment.");
      return false;
    };
    
    // Prepare transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    // DB Opts
    try {
      // Modify appointment
      switch(this.operation) {
        case "Create":
          // Commit appointment
          if(!this.updatedAppointment) throw new Error("No queued appointment to create.");
          const createResult = await this.updatedAppointment.createDoc(session);
          if(!createResult) throw new Error(`Failed to save appointment data.\n\n${this.updatedAppointment.getErrors()}`);
          const newAppointmentId: string | null = this.updatedAppointment.getId();
          if(!newAppointmentId) throw new Error("Failed to retrieve appointment ID.");
          // Update and commit account changes if required
          if(this.updatedAppointment.upcoming) {
            // Create upcoming appointment objects
            const patientUpcoming: UpcomingAppointmentData = {
              appointmentId: newAppointmentId,
              date: this.updatedAppointment.date,
              time: this.updatedAppointment.time,
              accountId: this.updatedAppointment.doctorId,
              accountName: `${this.doctor.forenames} ${this.doctor.surname}`,
            };
            const doctorUpcoming: UpcomingAppointmentData = {
              appointmentId: newAppointmentId,
              date: this.updatedAppointment.date,
              time: this.updatedAppointment.time,
              accountId: this.updatedAppointment.patientId,
              accountName: `${this.patient.forenames} ${this.patient.surname}`,
            };
            // Add appointment to doctor and patient accounts
            const doctorAdded: boolean = this.doctor.addAppointment(doctorUpcoming);
            if(!doctorAdded) throw new Error("Failed to add appointment to doctor account.");
            const patientAdded: boolean = this.patient.addAppointment(patientUpcoming);
            if(!patientAdded) throw new Error("Failed to add appointment to patient account.");
          };
          break;
        case "Update":
          // Commit appointment
          if(!this.updatedAppointment) throw new Error("No queued appointment to update.");
          const updateResult: boolean = await this.updatedAppointment.updateDoc(session);
          if(!updateResult) throw new Error(`Failed to update appointment data.\n\n${this.updatedAppointment.getErrors()}`);
          break;
        case "Delete":
          // Commit appointment
          const deleteResult = await this.appointment.deleteDoc(session);
          if(typeof deleteResult === 'number') throw new Error(`Failed to delete appointment data.\n\n${this.appointment.getErrors()}`);
          break;
        default:
          throw new Error("Invalid transaction operation.");
      };
      
      // Commit doctor upcoming appointments
      const doctorResult: boolean = await this.doctor.updateDoc(session);
      if(!doctorResult) throw new Error(`Failed to update doctor upcoming appointments.\n\n${this.doctor.getErrors()}`);

      // Commit patient upcoming appointments
      const patientResult: boolean = await this.patient.updateDoc(session);
      if(!patientResult) throw new Error(`Failed to update patient upcoming appointments.\n\n${this.patient.getErrors()}`);

      // Commit new doctor upcoming appointments if required
      if(this.newDoctor) {
        const newDoctorResult: boolean = await this.newDoctor.updateDoc(session);
        if(!newDoctorResult) throw new Error(`Failed to update new doctor upcoming appointments.\n\n${this.newDoctor.getErrors()}`);
      };

      // Commit new patient upcoming appointments if required
      if(this.newPatient) {
        const newPatientResult: boolean = await this.newPatient.updateDoc(session);
        if(!newPatientResult) throw new Error(`Failed to update new patient upcoming appointments.\n\n${this.newPatient.getErrors()}`);
      };

      // Commit transaction
      await session.commitTransaction();
      return true;
    } catch (err: any) {
      console.error(`Error in transaction: ${err}`);
      await session.abortTransaction();
      return false;
    } finally {
      session.endSession();
    };
  };
};

export default AppointmentTransaction;