// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsPatient from "../../../guards/IsPatient.js";

import schemaGetDoctor from "../../../schema/accounts/SchemaGetDoctor.js";
import routeGetDoctor from "../../../routes/accounts/RouteGetDoctor.js";

// Import routes & schemas
//TODO Insert patient endpoints here

/**
 * Function to declare all internally protected patient routes
 * @AJGamesArchive
 */
const protectedPatientRoutes = (): {
  routes: (protectedPatientRoutes: FastifyInstance) => void;
  prefix: string;
} => ({
  routes: (
    protectedPatientRoutes: FastifyInstance
  ): void => {
    // Guards
    protectedPatientRoutes.addHook("onRequest", guardIsPatient);

    // Test endpoints
    protectedPatientRoutes.get("/test", //TODO Replace with actual patient endpoints
      {},
      endpointTimeout(async (_req, rep) => rep.status(200).send(JSON.stringify({ message: "Hello Patient!" }, null, 2)), 5000), // 5 seconds
    );


    //Get Doctor endpoint
		protectedPatientRoutes.get("/profile/:id",
			{schema: schemaGetDoctor },
			endpointTimeout(routeGetDoctor, 5000), // 5 Seconds
		);


  },
  prefix: '/patient',
});

export default protectedPatientRoutes;