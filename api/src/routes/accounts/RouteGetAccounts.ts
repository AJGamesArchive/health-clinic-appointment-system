// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
	GetAccountsHeaders,
	GetAccountsQuerystring,
	GetAccountsReply200,
	GetAccountsReply,
} from '../../schema/accounts/SchemaGetAccounts.js';
import AccountService from '../../services/database/AccountService.js';
import AccountData, { JWTAccountData } from '../../types/data/AccountData.js';

/**
 * @summary Route to return all account data for a given type
 * @route GET /
 * @AJGamesArchive
 */
const routeGetAccounts = async (
	req: FastifyRequest<{
		Headers: GetAccountsHeaders;
		Querystring: GetAccountsQuerystring;
  }>,
	rep: FastifyReply,
): Promise<void> => {
	// Type user object
	const user = req.user as JWTAccountData;

	// Validate user role against data requested
	let reject: boolean = false;
	if(
		user.role === 'Patient' &&
		(req.query.type !== 'Doctor' || !req.query.onlyIds)
	) reject = true;
	if(
		user.role === 'Doctor' &&
		(req.query.type !== 'Patient' && !req.query.onlyIds)
	) reject = true;
	if(reject) {
		rep.status(403).send({
			error: 'FORBIDDEN',
			message: 'You do not have permission to access this resource.',
		} as GetAccountsReply);
		return;
	};

	// Fetch account data
	let accounts: AccountData[] | number = [];
	switch(req.query.type) {
		case 'Patient':
			accounts = await AccountService.getManyByPage(req.query.page ?? 1, 50, 'Patient');
			break;
		case 'Doctor':
			accounts = await AccountService.getManyByPage(req.query.page ?? 1, 50, 'Doctor');
			break;
		case 'Admin':
			accounts = await AccountService.getManyByPage(req.query.page ?? 1, 50, 'Admin');
			break;
		default:
			accounts = await AccountService.getManyByPage(req.query.page ?? 1, 50);
			break;
	};

	// Ensure DB request succeeded
	if(typeof accounts === 'number') {
		rep.status(500).send({
			error: 'INTERNAL_SERVER_ERROR',
			message: `An error occurred while fetching account data: Err: ${accounts}`,
		} as GetAccountsReply);
		return;
	};

	// Filter and return data
	rep.status(200).send(
		(!req.query.onlyIds) ?
			accounts.map((acc) => ({
				...acc,
				data: {
					...acc.patientData,
					...acc.doctorData,
					...acc.adminData,
				},
			})) as GetAccountsReply200[] :
			accounts.map((acc) => ({
				id: acc.id,
				title: acc.title,
				forenames: acc.forenames,
				surname: acc.surname,
			})) as GetAccountsReply200[],
	);
};

export default routeGetAccounts;
