// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import server from '../Server.js';

/**
 * @summery 'guardIsInternal' guard endpoint to validate a given requests JWT HTTP cookie
 * @guard Route Prefix /auth/internal
 * @AJGamesArchive
 */
const guardIsInternallyAuthenticated = async (
  req: FastifyRequest,
  rep: FastifyReply
): Promise<void> => {
  // Validate the JWT HTTP Cookie
  try {
    const jwt: string | undefined = req.cookies.access_token;
    if(!jwt) throw new Error('No JWT provided.');
    req.user = await server.jwt.verify(jwt);
  } catch (err: any) {
    rep.status(401).send(JSON.stringify({
      error: "UNAUTHORIZED",
      message: "You are not logged in. Please login to continue."
    }, null, 2));
    return;
  };

  // Continue with request
  return;
};

export default guardIsInternallyAuthenticated;