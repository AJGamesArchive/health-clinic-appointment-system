// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Function to handle enforcing an overall timeout on API endpoints
 * @param operation Main Endpoint Operation Function
 * @param timeout Timeout Value in Milliseconds
 * @returns Request & Reply Values
 * @note May god help me if this function breaks!
 * @AJGamesArchive
 */
const endpointTimeout = <D, P, B, Q, H, U>(
  operation: (
    req: FastifyRequest<{
      Params: P,
      Body: B,
      Querystring: Q,
      Headers: H,
      User: U,
    }>,
    rep: FastifyReply,
  ) => Promise<D>,
  timeout: number,
): ((
  req: FastifyRequest<{
    Params: P,
    Body: B,
    Querystring: Q,
    Headers: H,
    User: U,
  }>,
  rep: FastifyReply,
) => Promise<D | void>) => (
  (
    req: FastifyRequest<{
      Params: P,
      Body: B,
      Querystring: Q,
      Headers: H,
      User: U,
    }>,
    rep: FastifyReply,
  ): Promise<D | void> =>
    Promise.race([
      operation(req, rep),
      new Promise<void>((_, reject) =>
        setTimeout(() =>
          reject(new Error('504: Gateway Timeout - API Endpoint Timed Out')), timeout,
        ),
      ),
    ]).catch((err: any) => {
      console.error(err);
      rep.status(504).send(JSON.stringify({
        message: 'Gateway Timeout'
      }, null, 2));
    })
  );

export default endpointTimeout;