// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  DecodeCookieHeaders,
  DecodeCookieReply,
} from '../../schema/auth/SchemaDecodeCookie.js';

/**
 * @summary Route to decode a JWT cookie and return it's payload
 * @route GET /auth/internal/session/current/user
 * @AJGamesArchive
 */
const routeDecodeCookie = async (
	req: FastifyRequest<{
    Headers: DecodeCookieHeaders;
  }>,
	rep: FastifyReply,
): Promise<void> => {
	rep.status(200).send(JSON.stringify(req.user as DecodeCookieReply, null, 2));
	return;
};

export default routeDecodeCookie;
