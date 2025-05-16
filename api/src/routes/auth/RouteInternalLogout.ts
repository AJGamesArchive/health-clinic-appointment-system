// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  InternalLogoutHeaders,
  InternalLogoutReply200,
} from '../../schema/auth/SchemaInternalLogout.js';

/**
 * @summery 'routeInternalLogout' endpoint to remove all HTTP JWT Cookies attached to requests - achieving a user logout
 * @route DELETE /token/internal/cookie/logout
 * @AJGamesArchive
 */
const routeInternalLogout = async (
  _req: FastifyRequest<{
    Headers: InternalLogoutHeaders;
  }>,
  rep: FastifyReply
): Promise<void> => {
  // Clear all HTTP JWT Cookies
  rep
    .status(200)
    .clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    .clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    .send(JSON.stringify({
      message: 'Logout Successful',
    } as InternalLogoutReply200, null, 2));
  return;
};

export default routeInternalLogout;