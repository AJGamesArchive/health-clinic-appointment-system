// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import { JWTAccountData } from '../types/data/AccountData.js';
import AccountRoles from '../types/data/AccountRoles.js';

/**
 * @summery 'guardIsPatient' guard endpoint to validate that the user making the given request is a patient
 * @guard Route Prefix /auth/internal/patient
 * @AJGamesArchive
 */
const guardIsPatient = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Validate the JWT HTTP Cookie
  try {
    const userRole: AccountRoles | undefined = (req.user as JWTAccountData).role;
    if(userRole !== 'Patient') throw new Error('User is not a patient.');
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

export default guardIsPatient;