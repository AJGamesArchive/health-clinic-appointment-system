// Imports
//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	GetDoctorHeaders,
	GetDoctorParams,
	GetDoctorReply206,
	GetDoctorReply,
} from '../../schema/accounts/SchemaGetDoctor.js';

//Service function (abstract parent class)
import AccountService from '../../services/database/AccountService.js';

//Account data (child object) will be used to contain the logged in user accounts account to do operations
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';

/**
 * @summary Route to return all account data from a given ID, this is an admin only endpoint
 * @route GET /
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routeGetDoctor = async (
	req: FastifyRequest<{
		Headers: GetDoctorHeaders;
		Params: GetDoctorParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {

	// Type user object
	const user = req.user as JWTAccountData;
	const id = req.params.id

	// Validate if logged in user is requesting their own information
	let reject: boolean = false;
	if (user.role !== 'Doctor') reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as GetDoctorReply);
		return;
	};

	// Fetch account data
	let Doctor: AccountData | number;
	Doctor = await AccountService.getOne(id)

	// Ensure DB request succeeded
	if(typeof Doctor === 'number') {
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while fetching Doctor data: Err: ${Doctor}`,
		} as GetDoctorReply);
		return;
	};

	// Filter and return data
	rep.status(206).send({
		...Doctor,
		data: {
			...Doctor.doctorData,
		},
	} as GetDoctorReply206);
};

export default routeGetDoctor;
