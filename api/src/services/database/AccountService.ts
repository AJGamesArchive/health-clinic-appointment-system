// Imports
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import DB_Accounts from "../../models/Accounts.js";
import AccountData, { JWTAccountData } from "../../types/data/AccountData.js";
import AccountRoles from "../../types/data/AccountRoles.js";
import PatientData from "../../types/data/PatientData.js";
import DoctorData from "../../types/data/DoctorData.js";
import AdminData from "../../types/data/AdminData.js";

/**
 * Service class to handle all account database operations
 * @AJGamesArchive
 */
abstract class AccountService {
  /**
   * @private function to detect the account data from the base account data object based on a given role
   * @param data - The account data to detect
   * @returns The detected account data, otherwise returns undefined
   * @AJGamesArchive
   */
  private detectAccountData(data: AccountData): Object | undefined {
    let accountData: Object | undefined;
    switch(data.role) {
      case "Patient":
        accountData = data.patientData;
        break;
      case "Doctor":
        accountData = data.doctorData;
        break;
      case "Admin":
        accountData = data.adminData;
        break;
    };
    return accountData;
  };

  /**
   * @private function to save the sub-account data object to the correct role category key
   * @param data - The account data to save
   * @param accountData - The sub-account data to save
   * @note Function updates the original object
   * @AJGamesArchive
   */
  private categorizeAccountData(data: AccountData, accountData: Object): void {
    switch(data.role) {
      case "Patient":
        data.patientData = accountData as PatientData;
        break;
      case "Doctor":
        data.doctorData = accountData as DoctorData;
        break;
      case "Admin":
        data.adminData = accountData as AdminData;
        break;
    };
    return;
  };

  /**
   * @protected async function to save the account to the database as a new document
   * @param data - The account data to save
   * @param session - Optional mongoose session to run the operation in
   * @returns The saved account data, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async save(data: AccountData, session?: mongoose.mongo.ClientSession): Promise<AccountData | number> {
    // Ensure required data is present
    if(!data.password) return 400;
    const accountData: Object | undefined = this.detectAccountData(data); 
    if(!accountData) return 400;

    // DB opts
    try {
      // Create document
      const newAccount = new DB_Accounts({
        title: data.title,
        forenames: data.forenames,
        surname: data.surname,
        email: data.email,
        password: data.password,
        role: data.role,
        accountData,
      });

      // Insert document
      const document = await newAccount.save({ session });

      // Map created document
      let mappedDocument: AccountData = {
        id: document._id.toString(),
        title: document.title,
        forenames: document.forenames,
        surname: document.surname,
        email: document.email,
        password: null,
        role: (document.role as AccountRoles),
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      };
      this.categorizeAccountData(mappedDocument, document.accountData);

      // Return created document
      return mappedDocument;
    } catch (err: any) {
      console.error(`Failed to save account:\n\n${err}`);
      if(err.code === 11000) return 409; // Conflict
      return 500; // Internal Server Error
    };
  };

  /**
   * @protected async function update the existing account in the database
   * @param data - The new account data to set
   * @param session - Optional mongoose session to run the operation in
   * @returns The updated account data, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async update(data: AccountData, session?: mongoose.mongo.ClientSession): Promise<AccountData | number> {
    // Ensure required data is present
    if(!data.id) return 400;
    const accountData: Object | undefined = this.detectAccountData(data);
    if(!accountData) return 400;

    // DB opts
    try {
      // Update document
      const document = await DB_Accounts.findByIdAndUpdate(data.id, {
        title: data.title,
        forenames: data.forenames,
        surname: data.surname,
        email: data.email,
        password: data.password ?? undefined,
        role: data.role,
        updatedAt: new Date(),
        accountData,
      }, {
        new: true,
        session,
      });

      // Handle silent failure
      if(!document) return 404; // Not Found

      // Map updated document
      let mappedDocument: AccountData = {
        id: document._id.toString(),
        title: document.title,
        forenames: document.forenames,
        surname: document.surname,
        email: document.email,
        password: null,
        role: (document.role as AccountRoles),
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      };
      this.categorizeAccountData(mappedDocument, document.accountData);

      // Return updated document
      return mappedDocument;
    } catch (err: any) {
      console.error(`Failed to update account:\n\n${err}`);
      if(err.code === 11000) return 409; // Conflict
      return 500; // Internal Server Error
    };
  };

  /**
   * @protected async function to delete the account from the database
   * @param id - The account ID to delete
   * @param session - Optional mongoose session to run the operation in
   * @returns true if the account was deleted successfully, otherwise false
   * @AJGamesArchive
   */
  protected async delete(id: string, session?: mongoose.mongo.ClientSession): Promise<boolean> {
    // Ensure required data is present
    if(!id) return false;

    // DB opts
    try {
      // Delete document
      const result = await DB_Accounts.findByIdAndDelete(id, { session });

      // Handle silent failure
      if(!result) return false;

      // Return success
      return true;
    } catch (err: any) {
      console.error(`Failed to delete account:\n\n${err}`);
      return false;
    };
  };

  /**
   * @static async function to get an account from the database
   * @param id - The account ID to get
   * @returns An account data object, otherwise returns error status code
   * @AJGamesArchive
   */
  static async getOne(id: string): Promise<AccountData | number> {
    // Ensure required data is present
    if(!id) return 400;

    // DB opts
    try {
      // Get document
      const document = await DB_Accounts.findById(id);

      // Handle silent failure
      if(!document) return 404; // Not Found

      // Map updated document
      const account: AccountData = {
        id: document._id.toString(),
        title: document.title,
        forenames: document.forenames,
        surname: document.surname,
        email: document.email,
        password: null,
        role: (document.role as AccountRoles),
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        patientData: ((document.role as AccountRoles) === "Patient") ? document.accountData : undefined,
        doctorData: ((document.role as AccountRoles) === "Doctor") ? document.accountData : undefined,
        adminData: ((document.role as AccountRoles) === "Admin") ? document.accountData : undefined,
      };

      // Return account class
      return account;
    } catch (err: any) {
      console.error(`Failed to get account:\n\n${err}`);
      return 500; // Internal Server Error
    };
  };

  /**
   * @static async function to get a selection of accounts based on a 'paged' system
   * @param page - The page number to get
   * @param limit - The number of accounts to get per page
   * @param roleFilter - Optional filter to only get accounts of a specific role
   * @returns Array of account data objects, otherwise returns error status code
   * @AJGamesArchive
   */
  static async getManyByPage(page: number, limit: number, roleFilter?: AccountRoles): Promise<AccountData[] | number> {
    // Calculate the offset
    const offset: number = (page - 1) * limit;

    // DB opts
    try {
      // Get documents
      const documents = await DB_Accounts.find({ role: roleFilter }).skip(offset).limit(limit);

      // Map retrieved documents
      const classes: AccountData[] = documents.map((document) => ({
        id: document._id.toString(),
        title: document.title,
        forenames: document.forenames,
        surname: document.surname,
        email: document.email,
        password: null,
        role: (document.role as AccountRoles),
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        patientData: ((document.role as AccountRoles) === "Patient") ? document.accountData : undefined,
        doctorData: ((document.role as AccountRoles) === "Doctor") ? document.accountData : undefined,
        adminData: ((document.role as AccountRoles) === "Admin") ? document.accountData : undefined,
      }));

      // Return retrieved accounts
      return classes;
    } catch (err: any) {
      console.error(`Failed to get accounts:\n\n${err}`);
      return 500; // Internal Server Error
    };
  };

  /**
   * @static async function to get an account from the database by email
   * @param email - The account email to get
   * @returns Array of account data objects, otherwise returns error status code
   * @notes At the DB level, we cannot validate that only 1 account has an email, even though the schema should enforce uniqueness. If you are expecting a single document, check "array.length" and handle accordingly.
   * @notes Function specifically does NOT use '.findOne()' to ensure a query can be made to find duplicate emails should any slip through
   * @AJGamesArchive
   */
  static async getByEmail(email: string): Promise<AccountData[] | number> {
    // Ensure required data is present
    if(!email) return 400;

    // DB opts
    try {
      // Get document
      const documents = await DB_Accounts.find({ email: email });

      // Handle silent failure
      if(!documents) return 404; // Not Found

      // Map retrieved documents
      const classes: AccountData[] = documents.map((document) => ({
        id: document._id.toString(),
        title: document.title,
        forenames: document.forenames,
        surname: document.surname,
        email: document.email,
        password: null,
        role: (document.role as AccountRoles),
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        patientData: ((document.role as AccountRoles) === "Patient") ? document.accountData : undefined,
        doctorData: ((document.role as AccountRoles) === "Doctor") ? document.accountData : undefined,
        adminData: ((document.role as AccountRoles) === "Admin") ? document.accountData : undefined,
      }));

      // Return account class
      return classes;
    } catch (err: any) {
      console.error(`Failed to get account:\n\n${err}`);
      return 500; // Internal Server Error
    };
  };

  /**
   * @static async function to get the total number of accounts in the database
   * @param roleFilter - Optional filter to only get accounts of a specific role
   * @returns The total number of accounts in the database, otherwise returns null if operation fails
   * @AJGamesArchive
   */
  static async getTotal(roleFilter?: AccountRoles): Promise<number | null> {
    // DB opts
    try {
      // Get total number of documents
      const total: number = await DB_Accounts.countDocuments({ role: roleFilter });

      // Return total
      return total;
    } catch (err: any) {
      console.error(`Failed to get total accounts:\n\n${err}`);
      return null; // Internal Server Error
    };
  };

  /**
   * @static async function to validate a users credentials and return core account data for use in a JWT
   * @param email - The account email to validate
   * @param password - The account password to validate
   * @returns The account data if the credentials are valid, otherwise returns error status code
   * @AJGamesArchive
   */
  static async validateCredentials(email: string, password: string): Promise<JWTAccountData | number> {
    // Ensure required data is present
    if(!email || !password) return 400;

    // DB opts
    try {
      // Get document
      const document = await DB_Accounts.findOne({ email: email });

      // Handle silent failure
      if(!document) return 404; // Not Found

      // Validate password
      if(!await bcrypt.compare(password, document.password)) return 401; // Unauthorized

      // Map updated document
      const jwtData: JWTAccountData = {
        id: document._id.toString(),
        title: document.title,
        forenames: document.forenames,
        surname: document.surname,
        email: document.email,
        role: (document.role as AccountRoles),
      };

      // Return account data
      return jwtData;
    } catch (err: any) {
      console.error(`Failed to validate credentials:\n\n${err}`);
      return 500; // Internal Server Error
    };
  };

  /**
   * @static function to search for an account by surname, forenames, or email
   * @param type - The account type to search for
   * @param surname - The surname to search for (Optional)
   * @param forenames - The forenames to search for (Optional)
   * @param email - The email to search for (Optional)
   * @notes Searcher should ignore casing and whitespace
   * @notes Searcher should return all accounts that match the search criteria, including strings that contain the search string
   * @returns An array of account data objects, otherwise returns error status code
   * @AJGamesArchive
   */
  static async searchAccounts(
    type: AccountRoles,
    surname?: string,
    forenames?: string,
    email?: string,
  ): Promise<Partial<AccountData>[] | number> {
    // DB Opts
    try {
      // Build query object
      const query: any = { role: type };
      if(surname) {
        query.surname = { $regex: surname.replace(/\s+/g, ''), $options: 'i' };
      };
      if(forenames) {
        query.forenames = { $regex: forenames.replace(/\s+/g, ''), $options: 'i' };
      };
      if(email) {
        query.email = { $regex: email.replace(/\s+/g, ''), $options: 'i' };
      };

      // Find matching accounts
      const documents = await DB_Accounts.find(query);
      if (!documents) return 404;

      // Map to AccountData[]
      const accounts: Partial<AccountData>[] = documents.map((document) => ({
        id: document._id.toString(),
        title: document.title,
        forenames: document.forenames,
        surname: document.surname,
      }));
      return accounts;
    } catch (err: any) {
      console.error(`Failed to fetch account data:\n\n${err}`);
      return 500;
    };
  };
};

export default AccountService;
