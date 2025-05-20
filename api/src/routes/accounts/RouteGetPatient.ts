// Imports
//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	GetPatientHeaders,
	GetPatientParams,
	GetPatientReply200,
	GetPatientReply,
} from '../../schema/accounts/SchemaGetPatient.js';

//Service function (abstract parent class)
import AccountService from '../../services/database/AccountService.js';

//Account data (child object) will be used to contain the logged in user accounts account to do operations
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';

/**
 * @summary Route to doctor data for a patient by a given patient id
 * @route GET /auth/internal/patient/doctor/:id
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routeGetPatient = async (
	req: FastifyRequest<{
		Headers: GetPatientHeaders;
		Params: GetPatientParams;
  }>,
	rep: FastifyReply,
): Promise<void> => {
	// Type user object
	const user = req.user as JWTAccountData;
	const id = req.params.id

	// Validate if logged in user is requesting their own information
	let reject: boolean = false;
	if (user.role === 'Patient') reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as GetPatientReply);
		return;
	};

	// Fetch account data
	let Patient: AccountData | number;
	Patient = await AccountService.getOne(id)

	// Ensure DB request succeeded
	if(typeof Patient === 'number') {
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while fetching Patient data: Err: ${Patient}`,
		} as GetPatientReply);
		return;
	};

	// Filter and return data
	rep.status(200).send({
		...Patient,
		data: {
			...Patient.patientData,
		},
	} as GetPatientReply200);
};

export default routeGetPatient;
