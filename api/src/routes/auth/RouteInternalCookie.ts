// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import server from '../../Server.js';
import {
  InternalCookieHeaders,
  InternalCookieReply200,
  InternalCookieReplyError,
} from '../../schema/auth/SchemaInternalCookie.js';
import AccountService from '../../services/database/AccountService.js';
import { JWTAccountData } from '../../types/data/AccountData.js';

/**
 * @summery 'routeInternalCookie' endpoint authenticate users and return a JWT token embedded in a Cookie
 * @route POST /token/internal/cookie
 * @AJGamesArchive
 */
const routeInternalCookie = async (
  req: FastifyRequest<{
    Headers: InternalCookieHeaders;
  }>,
  rep: FastifyReply
): Promise<void> => {
  // Ensure authorization header is present
  const authHeader: string | undefined = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Basic ')) {
    rep.status(401).send({
      error: 'CLIENT_UNAUTHORIZED',
      message: "An invalid authorization header was passed. Please use 'basic' base64 authentication.",
    } as InternalCookieReplyError);
    return;
  };

  // Decode authorization header
  const encodedCredentials: string = authHeader.split(' ')[1] || '';
  if(!encodedCredentials) {
    rep.status(401).send({
      error: 'CLIENT_UNAUTHORIZED',
      message: 'No credentials were passed in the authorization header.',
    } as InternalCookieReplyError);
    return;
  };
  const credentials: string = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
  if(credentials === encodedCredentials) {
    rep.status(401).send({
      error: 'CLIENT_UNAUTHORIZED',
      message: 'The passed credentials are not valid base64 encoded.',
    } as InternalCookieReplyError);
    return;
  };
  const [email, password]: [string, string] = credentials.split(':') as [string, string];

  // Validate credentials
  const result: JWTAccountData | number = await AccountService.validateCredentials(email, password);
  if(typeof result === 'number') {
    rep.status(result === 500 ? 500 : 401).send({
      error: (result === 500) ? 'FAILED_DB_CONNECTION' : 'CLIENT_UNAUTHORIZED',
      message: 'The passed credentials are not valid.',
    } as InternalCookieReplyError);
    return;
  };

  // Generate and sign JWT
  const jwt: string = server.jwt.sign(result, { expiresIn: '1h' });

  // Generate and sign refresh token
  const refreshJwt: string = server.jwt.sign(result, { expiresIn: '14h' });

  // Send back access token
  rep
    .status(200)
    .setCookie('access_token', jwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    .setCookie('refresh_token', refreshJwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    .send(JSON.stringify({
      message: 'Login Successful',
    } as InternalCookieReply200, null, 2));
  return;
};

export default routeInternalCookie;