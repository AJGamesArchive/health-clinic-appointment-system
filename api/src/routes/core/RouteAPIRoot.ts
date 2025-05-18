// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import buildNum from '../../static/BuildNumber.js';
import {
  APIRootHeaders,
  APIRootReply,
} from '../../schema/core/SchemaAPIRoot.js';

/**
 * @summary Route to return general API information
 * @route GET /
 * @AJGamesArchive
 */
const routeAPIRoot = async (
	_req: FastifyRequest<{
    Headers: APIRootHeaders;
  }>,
	rep: FastifyReply,
): Promise<void> => {
	rep.status(200).send(JSON.stringify({
    api: "Health Clinic Appointment System API",
    version: buildNum,
    authors: [
      {
        name: "Alex Ward",
        email: "aw949@canterbury.ac.uk",
        website: "portfolio.alexward.dev",
      },
      {
        name: "Jessica Excell",
        email: "je398@canterbury.ac.uk",
      },
      {
        name: "Ethan McGuiness",
        email: "em814@canterbury.ac.uk",
      },
      {
        name: "Alfie Skinner",
        email: "as2679@canterbury.ac.uk",
      },
    ],
  } as APIRootReply, null, 2));
	return;
};

export default routeAPIRoot;
