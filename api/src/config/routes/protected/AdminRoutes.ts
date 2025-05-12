// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsAdmin from "../../../guards/IsAdmin.js";

// Import routes & schemas
//TODO Insert admin endpoints here

/**
 * Function to declare all internally protected admin routes
 * @AJGamesArchive
 */
const protectedAdminRoutes = (): {
  routes: (protectedAdminRoutes: FastifyInstance) => void;
  prefix: string;
} => ({
  routes: (
    protectedAdminRoutes: FastifyInstance
  ): void => {
    // Guards
    protectedAdminRoutes.addHook("onRequest", guardIsAdmin);

    // Test endpoints
    protectedAdminRoutes.get("/test", //TODO Replace with actual admin endpoints
      {},
      endpointTimeout(async (_req, rep) => rep.status(200).send(JSON.stringify({ message: "Hello Admin!" }, null, 2)), 5000), // 5 seconds
    );
  },
  prefix: '/admin',
});

export default protectedAdminRoutes;