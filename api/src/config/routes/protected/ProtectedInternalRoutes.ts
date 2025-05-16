// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsInternallyAuthenticated from "../../../guards/IsInternallyAuthenticated.js";

// Import protected user/role routes
import protectedPatientRoutes from "./PatientRoutes.js";
import protectedDoctorRoutes from "./DoctorRoutes.js";
import protectedAdminRoutes from "./AdminRoutes.js";

// Import routes & schemas
import schemaDecodeCookie from "../../../schema/auth/SchemaDecodeCookie.js";
import routeDecodeCookie from "../../../routes/auth/RouteDecodeCookie.js";

import schemaGetAccounts from "../../../schema/accounts/SchemaGetAccounts.js";
import routeGetAccounts from "../../../routes/accounts/RouteGetAccounts.js";

import schemaGetProfile from "../../../schema/accounts/SchemaGetProfile.js";
import routeGetProfile from "../../../routes/accounts/RouteGetProfile.js";


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

    // Setup protected user/role routes
    const protectedPatient = protectedPatientRoutes();
    protectedInternalRoutes.register(protectedPatient.routes, { prefix: protectedPatient.prefix });
    const protectedDoctor = protectedDoctorRoutes();
    protectedInternalRoutes.register(protectedDoctor.routes, { prefix: protectedDoctor.prefix });
    const protectedAdmin = protectedAdminRoutes();
    protectedInternalRoutes.register(protectedAdmin.routes, { prefix: protectedAdmin.prefix });

    // Auth endpoints
    protectedInternalRoutes.get("/session/current/user",
      { schema: schemaDecodeCookie },
      endpointTimeout(routeDecodeCookie, 5000), // 5 seconds
    );

    // Get All Account endpoint
    protectedInternalRoutes.get("/accounts",
      { schema: schemaGetAccounts },
      endpointTimeout(routeGetAccounts, 10000), // 10 seconds
    );

		// Get Profile endpoint
		protectedInternalRoutes.get("/profile",
			{schema: schemaGetProfile },
			endpointTimeout(routeGetProfile, 5000), // 5 Seconds
		);
  },
  prefix: '/auth/internal',
});

export default protectedInternalRoutes;