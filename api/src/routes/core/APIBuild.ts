// Imports
import { FastifyRequest, FastifyReply } from 'fastify';
import buildNum from '../../static/BuildNumber.js';

/**
 * Route to return active API version
 */
const routeAPIBuild = async (
	_req: FastifyRequest,
	rep: FastifyReply,
): Promise<void> => {
	rep.status(200).send(JSON.stringify({
    api: "Health Clinic Appointment System API",
    version: buildNum,
    authors: [
      {
        name: "Alex Ward",
        email: "aw949@canterbury.ac.uk",
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
        name: "Trinity Sayer",
        email: "ts560@canterbury.ac.uk",
      },
      {
        name: "Alfie Skinner",
        email: "as2679@canterbury.ac.uk",
      },
    ],
  }, null, 2));
	return;
};

export default routeAPIBuild;
