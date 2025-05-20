//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	PatchAdminHeaders,
	PatchAdminParams,
	PatchAdminReply200,
	PatchAdminReply,
	PatchAdminBody,
} from '../../schema/accounts/SchemaPatchAdmin.js';

//Service function (abstract parent class)
import AccountService from '../../services/database/AccountService.js';

//Account data (child object) will be used to contain the logged in user accounts account to do operations
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';
import Account from '../../classes/data/Account.js';

/**
 * @summary Route to update Admin account information. Takes an ID for Params, Body includes info to update
 * @route PATCH /auth/internal/admin/admin/:id
 * @Params ID - String of the account ID to update.
 * @Params Body - You can update any parts of paitent data, except for appointments
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routePatchAdmin = async (
	req: FastifyRequest<{
		Headers: PatchAdminHeaders;
		Params: PatchAdminParams;
		Body: PatchAdminBody
  }>,
	rep: FastifyReply,
): Promise<void> => {
	
	//Store currently logged in user (Should be an admin)
	const curUser = req.user as JWTAccountData;

	//Store the id passed in through params
	const targetID = req.params.id;

	//Store any information to update via the body
	const body = req.body;

	// Validate if logged in user is an admin, reject them if they aren't
	let reject: boolean = false;
	if (curUser.role !== 'Admin') reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as PatchAdminReply);
		return;
	};

	// Fetch target account data
	let accountToChange: AccountData | number;
	accountToChange = await AccountService.getOne(targetID)

	// Ensure DB request succeeded
	if(typeof accountToChange === 'number') {
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while fetching Account data: Err: ${accountToChange}`,
		} as PatchAdminReply);
		return;
	};
	
	//Create object to hold selected account
	let updater = new Account(accountToChange);

	//If the accounts roles is not a paitent then stop the process
	if (updater.role !== 'Admin')
	{
		rep.status(400).send({
			error: 'BAD_REQUEST',
			message: `An error occurred, you can only change admin data`,
		} as PatchAdminReply);
		return;
	}

	//Merge req.body information in the patient object
	const mergeOutcome: boolean = updater.mergeIntoAdminData(body)

	//If merge failed then error out
	if(!mergeOutcome){
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred, updating data error`,
		} as PatchAdminReply);
		return;
	}
	
	
	//Update data passed and store the outcome of the operation as a boolean
	const updateSuccessful: boolean = await updater.updateDoc()

	//Capture any errors from the update
	const updateErrors: string[] = updater.getErrors();

	//If the update isn't successful then send back the error strings.
	if (!updateSuccessful)
	{
		rep.status(418).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: updateErrors.toString(),
		} as PatchAdminReply);
		return
	};

	// Return success message
	rep.status(200).send({
		status: 'Update Successful!',
		message: `${updater.getID()} Was updated succesfully.`,
		id: updater.getID(),
		updatedAt: updater.toJSON().updatedAt
	} as PatchAdminReply200);
};

export default routePatchAdmin;
