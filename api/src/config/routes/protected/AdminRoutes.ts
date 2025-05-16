// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsAdmin from "../../../guards/IsAdmin.js";
import schemaGetSingleAccount from "../../../schema/accounts/SchemaGetSingleAccount.js";
import routeGetSingleAccount from "../../../routes/accounts/RouteGetSingleAccount.js";

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

    //Get account endpoint
    protectedAdminRoutes.get("/account/:id",
      {schema: schemaGetSingleAccount },
      endpointTimeout(routeGetSingleAccount, 5000), // 5 Seconds
    );
  },
  prefix: '/admin',
});

export default protectedAdminRoutes;