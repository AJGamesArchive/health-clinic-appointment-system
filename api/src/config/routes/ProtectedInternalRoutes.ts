// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsInternallyAuthenticated from "../../guards/IsInternallyAuthenticated.js";

// Import routes & schemas
import schemaDecodeCookie from "../../schema/auth/SchemaDecodeCookie.js";
import routeDecodeCookie from "../../routes/auth/RouteDecodeCookie.js";

/**
 * Function to declare all internally protected routes
 * @AJGamesArchive
 */
const protectedInternalRoutes = (): {
  routes: (protectedInternalRoutes: FastifyInstance) => void;
  prefix: string;
} => ({
  routes: (
    protectedInternalRoutes: FastifyInstance
  ): void => {
    // Guards
    protectedInternalRoutes.addHook("onRequest", guardIsInternallyAuthenticated);

    // Auth endpoints
    protectedInternalRoutes.get(
      "/session/current/user",
      { schema: schemaDecodeCookie },
      endpointTimeout(routeDecodeCookie, 5000), // 5 seconds
    );
  },
  prefix: '/auth/internal',
});

export default protectedInternalRoutes;