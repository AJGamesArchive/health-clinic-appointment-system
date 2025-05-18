// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import server from '../../Server.js';
import {
  InternalCookieRefreshHeaders,
  InternalCookieRefreshReply200,
  InternalCookieRefreshReply401,
} from '../../schema/auth/SchemaInternalCookieRefresh.js';
import { JWTAccountData } from '../../types/data/AccountData.js';

/**
 * @summery 'routeInternalCookie' endpoint to sign and send a new JWT HTTP Cookie for a given user 
 * @route POST /token/internal/cookie/refresh
 * @AJGamesArchive
 */
const routeInternalCookieRefresh = async (
  req: FastifyRequest<{
    Headers: InternalCookieRefreshHeaders;
  }>,
  rep: FastifyReply
): Promise<void> => {
  // Verify the refresh token
  let user: JWTAccountData;
  try {
    const refreshToken: string | undefined = req.cookies.refresh_token;
    if(!refreshToken) throw new Error('No refresh token provided.');
    user = await server.jwt.verify(refreshToken) as JWTAccountData;
  } catch (err: any) {
    rep.status(401).send(JSON.stringify({
      error: 'CLIENT_UNAUTHORIZED',
      message: 'The current login session has expired. Please login again.',
    } as InternalCookieRefreshReply401, null, 2));
    return;
  };

  // Generate and sign new JWT
  const jwt: string = server.jwt.sign(user, { expiresIn: '1h' });

  // Send back access token
  rep
    .status(205)
    .setCookie('access_token', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    .send(JSON.stringify({
      message: 'Login Refresh Successful',
    } as InternalCookieRefreshReply200, null, 2));
  return;
};

export default routeInternalCookieRefresh;