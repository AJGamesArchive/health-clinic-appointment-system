// Imports
import bcrypt from "bcrypt";
import saltRounds from "../../static/SaltRounds.js";
import AccountRoles from "../../types/data/AccountRoles.js";
import AccountData from "../../types/data/AccountData.js";
import PatientData from "../../types/data/PatientData.js";
import DoctorData from "../../types/data/DoctorData.js";
import AdminData from "../../types/data/AdminData.js";
import AccountService from "../../services/database/AccountService.js";

/**
 * Class to represent an users account data
 * @AJGamesArchive
 */
class Account extends AccountService {
  // Data props
  private id: string | null;
  private title: string;
  private forenames: string;
  private surname: string;
  private email: string;
  private password: string | null; // Should be null unless a new password is being passed
  private role: AccountRoles;
  private createdAt?: Date;
  private updatedAt?: Date;

  // Embedded props - split up programmatically to allow safer typing
  private patientData?: PatientData; //? Should probably be it's own class
  private doctorData?: DoctorData; //? Should probably be it's own class
  private adminData?: AdminData; //? Should probably be it's own class

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
   * @public function to update the account title
   * @param title the new title to set
   * @AJGamesArchive
   */
  public setTitle(title: string): void {
    this.title = title;
    return;
  };

  /**
   * @public function to update the account forenames
   * @param forenames the new forenames to set
   * @AJGamesArchive
   */
  public setForenames(forenames: string): void {
    this.forenames = forenames;
    return;
  };

  /**
   * @public function to update the account surname
   * @param surname the new surname to set
   * @AJGamesArchive
   */
  public setSurname(surname: string): void {
    this.surname = surname;
    return;
  };

  /**
   * @public function to update the account email
   * @param email the new email to set
   * @AJGamesArchive
   */
  public setEmail(email: string): void {
    this.email = email;
    return;
  };

  /**
   * @public function to update the account password
   * @param password the new password to set
   * @AJGamesArchive
   */
  public setPassword(password: string): void {
    this.password = password;
    return;
  };

  /**
   * @public function to update the account role
   * @param role the new role to set
   * @AJGamesArchive
   */
  public setRole(role: AccountRoles): void {
    this.role = role;
    return;
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
   * @returns true if the data was saved successfully, false if the data failed to save
   * @AJGamesArchive
   */
  public async createDoc(): Promise<boolean> {
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
    });

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
   * @returns true if the data was saved successfully, false if the data failed to save
   * @AJGamesArchive
   */
  public async updateDoc(): Promise<boolean> {
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
    });

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
   * @returns true if the data was deleted successfully, false if the data failed to delete
   * @AJGamesArchive
   */
  public async deleteDoc(): Promise<boolean> {
    // Ensure ID is not null
    if(!this.id) {
      this.errors.push("No ID loaded");
      return false;
    };

    // Trigger DB delete
    const result: boolean = await super.delete(this.id);

    // Handle result
    if(!result) {
      this.errors.push("An unexpected error occurred while trying to delete account data.");
      return false;
    };

    // Save result
    this.id = null;
    return true;
  };
};

export default Account;