// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsPatient from "../../../guards/IsPatient.js";

// Import account endpoints
import schemaGetDoctor from "../../../schema/accounts/SchemaGetDoctor.js";
import routeGetDoctor from "../../../routes/accounts/RouteGetDoctor.js";

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

    // Get Doctor Endpoint
		protectedPatientRoutes.get("/doctor/:id",
			{schema: schemaGetDoctor },
			endpointTimeout(routeGetDoctor, 5000), // 5 Seconds
		);
  },
  prefix: '/patient',
});

export default protectedPatientRoutes;