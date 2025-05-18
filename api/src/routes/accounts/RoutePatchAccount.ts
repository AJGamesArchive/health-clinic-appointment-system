//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	PatchAccountHeaders,
	PatchAccountParams,
	PatchAccountReply200,
	PatchAccountReply,
	PatchAccountBody,
} from '../../schema/accounts/SchemaPatchAccount.js';

//Service function (abstract parent class)
import AccountService from '../../services/database/AccountService.js';

//Account data (child object) will be used to contain the logged in user accounts account to do operations
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';
import Account from '../../classes/data/Account.js';

/**
 * @summary Route to return all account data from an account based on a given ID, this is an admin only endpoint
 * @route GET /auth/internal/admin/account/:id
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routePatchAccount = async (
	req: FastifyRequest<{
		Headers: PatchAccountHeaders;
		Params: PatchAccountParams;
		Body: PatchAccountBody
  }>,
	rep: FastifyReply,
): Promise<void> => {
	// Type user object
	const curUser = req.user as JWTAccountData;
	const targetID = req.params.id;
	const body = req.body;

	// Validate if logged in user is requesting their own information
	let reject: boolean = false;
	if (curUser.role !== 'Admin') reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as PatchAccountReply);
		return;
	};

	// Fetch account data
	let accountToChange: AccountData | number;
	accountToChange = await AccountService.getOne(targetID)

	// Ensure DB request succeeded
	if(typeof accountToChange === 'number') {
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while fetching Account data: Err: ${accountToChange}`,
		} as PatchAccountReply);
		return;
	};

	//Patch in changes requested through the body
	let updater = new Account(accountToChange);
	if (body.title) updater.title = body.title
	if (body.forenames) updater.forenames = body.forenames
	if (body.surname) updater.surname = body.surname
	if (body.email) updater.email = body.email

	if (body.password) 
	{
		updater.password = body.password
		const hashSuccessful: boolean | null = await updater.hashPassword()
		if (!hashSuccessful)
		{
			rep.status(500).send({
				error: 'INTERNAL_SERVER_ERROR',
				message: `An error occurred while hashingh new passwrord for Err: ${accountToChange.id}`,
			} as PatchAccountReply);
			return;
		};
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
		} as PatchAccountReply);
		return
	};

	// Return success message
	rep.status(200).send({
		status: 'Update Successful!',
		message: `${updater.getID()} Was updated succesfully.`,
		id: updater.getID(),
		role: updater.toJSON().role,
		updatedAt: updater.toJSON().updatedAt
	} as PatchAccountReply200);
};

export default routePatchAccount;
