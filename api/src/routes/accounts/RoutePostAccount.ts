//Import fastify
import { FastifyRequest, FastifyReply } from 'fastify';

//Import interfaces from the schema file
import {
	PostAccountHeaders,
	PostAccountReply201,
	PostAccountReply,
	PostAccountBody,
} from '../../schema/accounts/SchemaPostAccount.js';


//Account data (child object) will be used to contain the logged in user accounts account to do operations
import { JWTAccountData } from '../../types/data/AccountData.js';
import Account from '../../classes/data/Account.js';
import PatientData from '../../types/data/PatientData.js';
import LifeStyleFactors from '../../types/data/LifeStyleFactors.js';
import DoctorData from '../../types/data/DoctorData.js';
import AdminData from '../../types/data/AdminData.js';

/**
 * @summary Route to update CORE account information. Takes an ID for Params, Body includes info to update
 * @route Post /auth/internal/admin/account/
 * @Params Body - You can only update these variables {title, forename, surname, email, password}
 * @HammerCyclone
 */

//Use interfaces to insert into headers and querystring (req = Request, rep = Reply)
const routePostAccount = async (
	req: FastifyRequest<{
		Headers: PostAccountHeaders;
		Body: PostAccountBody
  }>,
	rep: FastifyReply,
): Promise<void> => {
	
	//Store currently logged in user (Should be an admin)
	const curUser = req.user as JWTAccountData;

	//Store any information to update via the body
	const body = req.body;

	// Validate if logged in user is an admin, reject them if they aren't
	let reject: boolean = false;
	if (curUser.role !== 'Admin') reject = true;

	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as PostAccountReply);
		return;
	};

	//reset rejector
	//Build array of missing items
	reject = false;
	if(!body.title) 			reject = true;
	if(!body.forenames)		reject = true; 
	if(!body.surname) 		reject = true;
	if(!body.email)				reject = true;
	if(!body.role)				reject = true;

	let creator = new Account(body)

	const hashSuccessful: boolean | null = await creator.hashPassword()

	//If password hashing is unsuccessful then return 500
	if (!hashSuccessful)
	{
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while hashingh new password.`,
		} as PostAccountReply);
		return;
	};

	switch(body.role)
	{
		case "Patient":
			const emptyLifeStyleFactors: LifeStyleFactors = {
				smokingStatus:         [],
				alcoholConsumption:    [],
				recreationalDrugUse:   [],
				exerciseFrequency:     [],
				sleepQuality:          [],
				stressLevel:           [],
				socialSupport:         [],
				travelHistory:         [],
				familyConditionals:    [],
				environmentalFactors:  [],
			};

			const emptyPatientData: PatientData = {
				gender:            '',
				dateOfBirth:       new Date(),
				contactInfo:       { email: body.email, phone: '' },
				emergencyContact:  [],
				address: {
					addressLine1:	'', 
					addressLine2: '',
					city: 				'', 
					county: 			'', 
					postCode: 		'',
				},
				upcomingAppointments: [],
				medicalInformation: {
					bloodType:   '',
					sexAtBirth:  '',
					conditions:  [],
					allergies:   [],
				},
				lifeStyleHistory: emptyLifeStyleFactors,
				importantNotes:   [],
			};

			creator.setPatientData(emptyPatientData)
		break;

		case 'Doctor':
			const emptyDoctorData: DoctorData = {
				specialty:            '',
				upcomingAppointments: [],
				workingHours: [],
				contactInfo: {
					workEmail:	'',
					workPhone:	'',
				}
			};
			creator.setDoctorData(emptyDoctorData)
		break;

		case 'Admin':
			const emptyAdminData: AdminData = {
				staffRole: '',
			};
			creator.setAdminData(emptyAdminData)
		break;
	}

	const createOutcome: boolean = await creator.createDoc();

	if (!createOutcome) {
		rep.status(500).send({
		error: 'INTERNAL_SERVER_ERROR',
		message: `An error occurred while creating account data`,
		} as PostAccountReply);
		return;
	}

	// Return success message
	rep.status(201).send({
		status: 'Account Creation Successful!',
		message: `New Account ID: ${creator.getID()}.`,
		id: creator.getID(),
		role: creator.toJSON().role,
		createdAt: creator.toJSON().createdAt,
	} as PostAccountReply201);
};

export default routePostAccount;
