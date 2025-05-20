// Imports
//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	GetSingleAccountHeaders,
	GetSingleAccountParams,
	GetSingleAccountReply200,
	GetSingleAccountReply,
} from '../../schema/accounts/SchemaGetSingleAccount.js';

//Service function (abstract parent class)
import AccountService from '../../services/database/AccountService.js';

//Account data (child object) will be used to contain the logged in user accounts account to do operations
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';

/**
 * @summary Route to return all account data from an account based on a given ID, this is an admin only endpoint
 * @route GET /auth/internal/admin/account/:id
 * @Params Params - The ID of the account to get
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routeGetSingleAccount = async (
	req: FastifyRequest<{
		Headers: GetSingleAccountHeaders;
		Params: GetSingleAccountParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {
	// Type user object
	const user = req.user as JWTAccountData;
	const id = req.params.id

	// Validate if logged in user is requesting their own information
	let reject: boolean = false;
	if (user.role !== 'Admin') reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as GetSingleAccountReply);
		return;
	};

	// Fetch account data
	let SingleAccount: AccountData | number;
	SingleAccount = await AccountService.getOne(id)

	// Ensure DB request succeeded
	if(typeof SingleAccount === 'number') {
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while fetching SingleAccount data: Err: ${SingleAccount}`,
		} as GetSingleAccountReply);
		return;
	};

	// Filter and return data
	rep.status(200).send({
		...SingleAccount,
		data: {
			...SingleAccount.patientData,
			...SingleAccount.doctorData,
			...SingleAccount.adminData,
		},
	} as GetSingleAccountReply200);
};

export default routeGetSingleAccount;
