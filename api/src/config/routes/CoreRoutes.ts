// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../utilities/core/EndpointTimeout.js";

// Import routes & schemas
import schemaAPIRoot from "../../schema/core/SchemaAPIRoot.js";
import routeAPIRoot from "../../routes/core/RouteAPIRoot.js";

/**
 * Function to declare all core routes
 * @AJGamesArchive
 */
const coreRoutes = ((
  coreRoutes: FastifyInstance,
): void => {
  // Core endpoints
  coreRoutes.get("/",
    { schema: schemaAPIRoot },
    endpointTimeout(routeAPIRoot, 10000), // 10 seconds
  );
});

export default coreRoutes;