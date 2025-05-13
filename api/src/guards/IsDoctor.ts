// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import { JWTAccountData } from '../types/data/AccountData.js';
import AccountRoles from '../types/data/AccountRoles.js';

/**
 * @summery 'guardIsDoctor' guard endpoint to validate that the user making the given request is a doctor
 * @guard Route Prefix /auth/internal/doctor
 * @AJGamesArchive
 */
const guardIsDoctor = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Validate the JWT HTTP Cookie
  try {
    const userRole: AccountRoles | undefined = (req.user as JWTAccountData).role;
    if(userRole !== 'Doctor') throw new Error('User is not a doctor.');
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

export default guardIsDoctor;