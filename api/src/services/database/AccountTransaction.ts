// Imports
import mongoose from "mongoose";
import Account from "../../classes/data/Account.js";
import AccountService from "./AccountService.js";
import AppointmentTransaction from "./AppointmentTransaction.js";
import AppointmentService from "./AppointmentService.js";
import AccountData from "../../types/data/AccountData";
import Tomato from "../../classes/errors/Tomato.js";

/**
 * Class to handle account deletion transactions
 * @note Transaction will delete an account by ID along with all associated appointments and appointment upcoming references
 * @use Delete => init, commit
 * @example
 * const transaction = await AccountDeletionTransaction.initTransaction('Patient', '1234567890');
 * const success = await transaction.commitTransaction();
 * @AJGamesArchive
 */
class AccountDeletionTransaction {
  // Props
  private accountId: string;
  private account: Account;
  private appointmentIds: string[];

  // Constructor
  private constructor(
    id: string,
    account: Account,
    appointmentIds: string[]
  ) {
    this.accountId = id;
    this.account = account;
    this.appointmentIds = appointmentIds;
    return;
  };

  /**
   * @static async function to init an account deletion transaction and fetch all required data based on given params
   * @param type - The type of account to delete (Patient or Doctor)
   * @param id - The ID of the account to delete
   * @returns {Promise<AccountDeletionTransaction | null>} - Returns an instance of AccountDeletionTransaction or null if an error occurred
   * @AJGamesArchive
   */
  static async initTransaction(type: 'Patient' | 'Doctor', id: string): Promise<AccountDeletionTransaction | null>  {
    // Fetch required data
    const accountPromise: Promise<AccountData | number> = AccountService.getOne(id);
    const appointmentIdsPromise: Promise<string[] | number> = AppointmentService.getAppointmentIdsByUserId(type, id);

    // Resolve promises
    const [ account, appointmentIds ] = await Promise.all([accountPromise, appointmentIdsPromise]);

    // Validate data
    if(typeof account === 'number') return null;
    const accountObj: Account = new Account(account);
    if(typeof appointmentIds === 'number') return null;

    // Init transaction class
    return new AccountDeletionTransaction (id, accountObj, appointmentIds);
  };

  /**
   * @public async function to run the account deletion transaction and delete the account and all associated appointments and appointment upcoming references
   * @param passedSession - The mongoose session to use for the transaction (optional)
   * @notes: This function will create a new session if one is not passed
   * @returns {Promise<boolean>} - Returns true if the transaction was successful, false otherwise
   * @AJGamesArchive
   */
  public async commitTransaction(passedSession?: mongoose.mongo.ClientSession): Promise<boolean> {
    // Create a mongoose session if required
    const session: mongoose.mongo.ClientSession = await mongoose.startSession();
    if(!passedSession) session.startTransaction();

    // DB Opts
    try {
      // Loop through all appointment IDs and run an appointment deletion transaction for each appointment
      for(const appId of this.appointmentIds) {
        // Delete every appointment and all upcoming appointment references
        const appTransaction: AppointmentTransaction | number = await AppointmentTransaction.initAmendTransaction('Delete', appId);
        if(typeof appTransaction === 'number') throw new Tomato('Error creating appointment deletion transaction for appointment ID: ' + appId);
        const applied: boolean = await appTransaction.applyTransaction();
        if(!applied) throw new Tomato('Error applying appointment deletion transaction for appointment ID: ' + appId);
        const committed: boolean = await appTransaction.commitTransaction(passedSession ?? session);
        if(!committed) throw new Tomato('Error committing appointment deletion transaction for appointment ID: ' + appId);
      };

      // Delete the account
      const accountDeleted: boolean = await this.account.deleteDoc(passedSession ?? session);
      if(!accountDeleted) throw new Tomato('Error deleting account with ID: ' + this.accountId);

      // Commit the transaction
      if(!passedSession) await session.commitTransaction();
      return true;
    } catch (err: any) {
      console.error("Error during transaction:", err);
      if(!passedSession) await session.abortTransaction();
      return false;
    } finally {
      if(!passedSession) await session.endSession();
    };
  };
};

export default AccountDeletionTransaction ;