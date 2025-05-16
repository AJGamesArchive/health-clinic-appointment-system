// Imports
//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	GetProfileHeaders,
	GetProfileParams,
	GetProfileReply200,
	GetProfileReply,
} from '../../schema/accounts/SchemaGetProfile.js';

//Service function (abstract parent class)
import AccountService from '../../services/database/AccountService.js';

//Account data (child object) will be used to contain the logged in user accounts account to do operations
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';

/**
 * @summary Route to return all account data from a given ID, must be from the self
 * @route GET /
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routeGetProfile = async (
	req: FastifyRequest<{
		Headers: GetProfileHeaders;
		Params: GetProfileParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {

	// Type user object
	const user = req.user as JWTAccountData;
	const id = req.params.id

	// Validate if logged in user is requesting their own information
	let reject: boolean = false;
	if (user.id !== id) reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as GetProfileReply);
		return;
	};

	// Fetch account data
	let profile: AccountData | number;
	profile = await AccountService.getOne(id)

	// Ensure DB request succeeded
	if(typeof profile === 'number') {
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while fetching profile data: Err: ${profile}`,
		} as GetProfileReply);
		return;
	};

	// Filter and return data
	rep.status(200).send({
		...profile,
		data: {
			...profile.patientData,
			...profile.doctorData,
			...profile.adminData,
		},
	} as GetProfileReply200);
};

export default routeGetProfile;
