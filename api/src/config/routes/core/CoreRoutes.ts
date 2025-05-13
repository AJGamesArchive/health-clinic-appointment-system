// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Import routes & schemas
import schemaAPIRoot from "../../../schema/core/SchemaAPIRoot.js";
import routeAPIRoot from "../../../routes/core/RouteAPIRoot.js";
import schemaInternalCookie from "../../../schema/auth/SchemaInternalCookie.js";
import routeInternalCookie from "../../../routes/auth/RouteInternalCookie.js";
import schemaInternalCookieRefresh from "../../../schema/auth/SchemaInternalCookieRefresh.js";
import routeInternalCookieRefresh from "../../../routes/auth/RouteInternalCookieRefresh.js";
import schemaInternalLogout from "../../../schema/auth/SchemaInternalLogout.js";
import routeInternalLogout from "../../../routes/auth/RouteInternalLogout.js";

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
    endpointTimeout(routeAPIRoot, 5000), // 5 seconds
  );

  // Auth endpoints
  coreRoutes.post("/token/internal/cookie",
    { schema: schemaInternalCookie },
    endpointTimeout(routeInternalCookie, 20000), // 20 seconds
  );
  coreRoutes.post("/token/internal/cookie/refresh",
    { schema: schemaInternalCookieRefresh },
    endpointTimeout(routeInternalCookieRefresh, 10000), // 10 seconds
  );
  coreRoutes.delete("/token/internal/cookie/logout",
    { schema: schemaInternalLogout },
    endpointTimeout(routeInternalLogout, 5000), // 5 seconds
  );
});

export default coreRoutes;