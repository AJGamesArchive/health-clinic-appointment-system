// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  SearchAccountsHeaders,
  SearchAccountsParams,
  SearchAccountsQuerystring,
  SearchAccountsReply200,
  SearchAccountsReplyError,
} from '../../schema/accounts/SchemaSearchAccounts.js';
import AccountService from '../../services/database/AccountService.js';
import AccountData from '../../types/data/AccountData.js';

/**
 * @summary Route to search for an account id and name by surname, forenames, or email
 * @route GET /auth/internal/accounts/:type/search
 * @AJGamesArchive
 */
const routeSearchAccounts = async (
	req: FastifyRequest<{
    Headers: SearchAccountsHeaders;
    Params: SearchAccountsParams;
    Querystring: SearchAccountsQuerystring;
  }>,
	rep: FastifyReply,
): Promise<void> => {
	// Fetch Accounts
  const searchResults: Partial<AccountData>[] | number = await AccountService.searchAccounts(
    req.params.type,
    req.query.surname,
    req.query.forenames,
    req.query.email,
  );

  // Handle errors
  if(typeof searchResults === 'number') {
    rep.status(searchResults).send({
      error: (searchResults === 404) ? 'NO_ACCOUNTS_FOUND' : 'INTERNAL_SERVER_ERROR',
      message: `No accounts could be found for the following search params:`,
      params: {
        surname: req.query.surname,
        forenames: req.query.forenames,
        email: req.query.email,
      },
    } as SearchAccountsReplyError);
    return;
  };

  // Send back results
  rep.status(200).send(searchResults as SearchAccountsReply200[]);
	return;
};

export default routeSearchAccounts;