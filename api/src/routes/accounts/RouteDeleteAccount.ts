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
import PatientData from '../../types/data/PatientData.js';
import LifeStyleFactors from '../../types/data/LifeStyleFactors.js';
import DoctorData from '../../types/data/DoctorData.js';
import AccountService from '../../services/database/AccountService.js';
import Appointment from '../../classes/data/Appointment.js';
import AppointmentService from '../../services/database/AppointmentService.js';

/**
 * @summary Route to update CORE account information. Takes an ID for Params, Body includes info to update
 * @route Delete /auth/internal/admin/account/
 * @Params Body - You can only update these variables {title, forename, surname, email, password}
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
				contactInfo:       { email: '', phone: '' },
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
			const getUpcoming = accountToDelete.getUpcomingAppointments()
			if (getUpcoming){
				getUpcoming.forEach( (appointment) =>{
					const del = new Appointment(appointment)
				});
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
