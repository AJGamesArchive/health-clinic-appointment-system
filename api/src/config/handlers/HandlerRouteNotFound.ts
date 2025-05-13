// Imports
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * @summery 'RouteNotFound' request handler to return a specific error when a request is targeting an undefined endpoint
 * @requests All Unhandled Endpoint Requests
 * @AJGamesArchive
 */
const handlerRouteNotFound = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  rep.status(404).send(JSON.stringify({
    status: "404",
    error: `Route Not Found`,
    path: req.url,
  }, null, 2));
  return;
};

export default handlerRouteNotFound;