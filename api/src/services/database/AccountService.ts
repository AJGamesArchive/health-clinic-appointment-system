// Imports
import bcrypt from "bcrypt";
import DB_Accounts from "../../models/Accounts.js";
import AccountData, { JWTAccountData } from "../../types/data/AccountData.js";
import AccountRoles from "../../types/data/AccountRoles.js";
import PatientData from "../../types/data/PatientData.js";
import DoctorData from "../../types/data/DoctorData.js";
import AdminData from "../../types/data/AdminData.js";
import Account from "../../classes/data/Account.js";

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
   * @returns The saved account data, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async save(data: AccountData): Promise<AccountData | number> {
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
      const document = (await newAccount.save());

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
   * @returns The updated account data, otherwise returns error status code
   * @AJGamesArchive
   */
  protected async update(data: AccountData): Promise<AccountData | number> {
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
        accountData,
      }, {
        new: true,
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
   * @returns true if the account was deleted successfully, otherwise false
   * @AJGamesArchive
   */
  protected async delete(id: string): Promise<boolean> {
    // Ensure required data is present
    if(!id) return false;

    // DB opts
    try {
      // Delete document
      const result = await DB_Accounts.findByIdAndDelete(id);

      // Handle silent failure
      if(!result) return false;

      // Return success
      return true;
    } catch (err: any) {
      console.error(`Failed to delete account:\n\n${err}`);
      return false;
    };
  }

  /**
   * @static async function to get an account from the database
   * @param id - The account ID to get
   * @returns A loaded account class, otherwise returns error status code
   * @AJGamesArchive
   */
  static async getOne(id: string): Promise<Account | number> {
    // Ensure required data is present
    if(!id) return 400;

    // DB opts
    try {
      // Get document
      const document = await DB_Accounts.findById(id);

      // Handle silent failure
      if(!document) return 404; // Not Found

      // Map updated document
      const account: Account = new Account({
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
      });

      // Return account class
      return account;
    } catch (err: any) {
      console.error(`Failed to get account:\n\n${err}`);
      return 500; // Internal Server Error
    };
  }

  /**
   * @static async function to get a selection of accounts based on a 'paged' system
   * @param page - The page number to get
   * @param limit - The number of accounts to get per page
   * @param roleFilter - Optional filter to only get accounts of a specific role
   * @returns Array of account classes, otherwise returns error status code
   * @AJGamesArchive
   */
  static async getManyByPage(page: number, limit: number, roleFilter?: AccountRoles): Promise<Account[] | number> {
    // Calculate the offset
    const offset: number = (page - 1) * limit;

    // DB opts
    try {
      // Get documents
      const documents = await DB_Accounts.find({ role: roleFilter }).skip(offset).limit(limit);

      // Map retrieved documents
      const classes: Account[] = documents.map((document) => new Account({
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
  }

  /**
   * @static async function to get an account from the database by email
   * @param email - The account email to get
   * @returns Array of classes, otherwise returns error status code
   * @notes At the DB level, we cannot validate that only 1 account has an email, even though the schema should enforce uniqueness. If you are expecting a single document, check "array.length" and handle accordingly.
   * @notes Function specifically does NOT use '.findOne()' to ensure a query can be made to find duplicate emails should any slip through
   * @AJGamesArchive
   */
  static async getByEmail(email: string): Promise<Account[] | number> {
    // Ensure required data is present
    if(!email) return 400;

    // DB opts
    try {
      // Get document
      const documents = await DB_Accounts.find({ email: email });

      // Handle silent failure
      if(!documents) return 404; // Not Found

      // Map retrieved documents
      const classes: Account[] = documents.map((document) => new Account({
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
};

export default AccountService;
