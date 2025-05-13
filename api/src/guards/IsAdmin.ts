// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import { JWTAccountData } from '../types/data/AccountData.js';
import AccountRoles from '../types/data/AccountRoles.js';

/**
 * @summery 'guardIsAdmin' guard endpoint to validate that the user making the given request is an admin
 * @guard Route Prefix /auth/internal/admin
 * @AJGamesArchive
 */
const guardIsAdmin = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Validate the JWT HTTP Cookie
  try {
    const userRole: AccountRoles | undefined = (req.user as JWTAccountData).role;
    if(userRole !== 'Admin') throw new Error('User is not an admin.');
  } catch (err: any) {
    rep.status(403).send(JSON.stringify({
      error: "FORBIDDEN",
      message: "You do not have permission to access this resource."
    }, null, 2));
    return;
  };

  // Continue with request
  return;
};

export default guardIsAdmin;