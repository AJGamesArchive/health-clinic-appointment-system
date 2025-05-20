//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	DeleteAccountHeaders,
	DeleteAccountReply200,
	DeleteAccountParams,
	DeleteAccountReply,
} from '../../schema/accounts/SchemaDeleteAccount.js';

//Account data (child object) will be used to contain the logged in user accounts account to do operations
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';
import Account from '../../classes/data/Account.js';
import AccountService from '../../services/database/AccountService.js';
import AccountDeletionTransaction from '../../services/database/AccountTransaction.js';

/**
 * @summary Route to delete CORE account information. Takes an ID for Params
 * @route Delete /auth/internal/admin/account/
 * @Params Body - The ID of the account to delete
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routeDeleteAccount = async (
	req: FastifyRequest<{
		Headers: DeleteAccountHeaders;
		Params: DeleteAccountParams
  }>,
	rep: FastifyReply,
): Promise<void> => {
	
	//Store currently logged in user (Should be an admin)
	const curUser = req.user as JWTAccountData;

	// Validate if logged in user is an admin, reject them if they aren't
	let reject: boolean = false;
	if (curUser.role !== 'Admin') reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as DeleteAccountReply);
		return;
	};

	const fetchAccount:AccountData | number = await AccountService.getOne(req.params.id)

	if (typeof fetchAccount === 'number') {
		rep.status(500).send({
		error: 'INTERNAL_SERVER_ERROR',
		message: `An error occurred while fetching account data`,
		} as DeleteAccountReply);
		return;
	}

	const accountToDelete = new Account(fetchAccount);

	switch(accountToDelete.role)
	{
		case "Patient":
			const patientTransaction = await AccountDeletionTransaction.initTransaction('Patient', req.params.id);
			if (!patientTransaction)
			{
				rep.status(500).send({
				error: 'INTERNAL_SERVER_ERROR',
				message: `An error occurred while deleting Patient data`,
				} as DeleteAccountReply);
				return;
			}
			const patientSuccess = await patientTransaction.commitTransaction();

			if (!patientSuccess)
			{
				rep.status(500).send({
				error: 'INTERNAL_SERVER_ERROR',
				message: `An error occurred while deleting Doctor data`,
				} as DeleteAccountReply);
				return;
			}
		break;

		case 'Doctor':
			const doctorTransaction = await AccountDeletionTransaction.initTransaction('Doctor', req.params.id);
			if (!doctorTransaction)
			{
				rep.status(500).send({
				error: 'INTERNAL_SERVER_ERROR',
				message: `An error occurred while deleting admin data`,
				} as DeleteAccountReply);
				return;
			}
			const doctorSuccess = await doctorTransaction.commitTransaction();

			if (!doctorSuccess)
			{
				rep.status(500).send({
				error: 'INTERNAL_SERVER_ERROR',
				message: `An error occurred while deleting admin data`,
				} as DeleteAccountReply);
				return;
			}
		break;

		case 'Admin':
			const adminDelete: boolean = await accountToDelete.deleteDoc()
			if (!adminDelete)
			{
				rep.status(500).send({
				error: 'INTERNAL_SERVER_ERROR',
				message: `An error occurred while deleting admin data`,
				} as DeleteAccountReply);
				return;
			}
		break;
	}

	// Return success message
	rep.status(200).send({
		status: 'Account Deletion Successful!',
		message: `Deleted ID: ${accountToDelete.getID()}.`,
		id: accountToDelete.getID(),
		role: accountToDelete.toJSON().role,
	} as DeleteAccountReply200);
};

export default routeDeleteAccount;
