// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsInternallyAuthenticated from "../../../guards/IsInternallyAuthenticated.js";

// Import protected user/role routes
import protectedPatientRoutes from "./PatientRoutes.js";
import protectedDoctorRoutes from "./DoctorRoutes.js";
import protectedAdminRoutes from "./AdminRoutes.js";

// Import account endpoints
import schemaDecodeCookie from "../../../schema/auth/SchemaDecodeCookie.js";
import routeDecodeCookie from "../../../routes/auth/RouteDecodeCookie.js";
import schemaGetAccounts from "../../../schema/accounts/SchemaGetAccounts.js";
import routeGetAccounts from "../../../routes/accounts/RouteGetAccounts.js";
import schemaGetProfile from "../../../schema/accounts/SchemaGetProfile.js";
import routeGetProfile from "../../../routes/accounts/RouteGetProfile.js";
import schemaSearchAccounts from "../../../schema/accounts/SchemaSearchAccounts.js";
import routeSearchAccounts from "../../../routes/accounts/RouteSearchAccounts.js";

// Import appointment endpoints
import schemaMyAppointments from "../../../schema/appointments/SchemaMyAppointments.js";
import routeMyAppointments from "../../../routes/appointments/RouteMyAppointments.js";
import schemaMyAppointment from "../../../schema/appointments/SchemaMyAppointment.js";
import routeMyAppointment from "../../../routes/appointments/RouteMyAppointment.js";
import schemaBookAppointment from "../../../schema/appointments/SchemaBookAppointment.js";
import routeBookAppointment from "../../../routes/appointments/RouteBookAppointment.js";
import schemaAmendAppointment from "../../../schema/appointments/SchemaAmendAppointment.js";
import routeAmendAppointment from "../../../routes/appointments/RouteAmendAppointment.js";

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

    // Account endpoints
    protectedInternalRoutes.get("/accounts",
      { schema: schemaGetAccounts },
      endpointTimeout(routeGetAccounts, 10000), // 10 seconds
    );
		protectedInternalRoutes.get("/profile",
			{schema: schemaGetProfile },
			endpointTimeout(routeGetProfile, 5000), // 5 Seconds
		);
    protectedInternalRoutes.get("/accounts/:type/search",
      { schema: schemaSearchAccounts },
      endpointTimeout(routeSearchAccounts, 10000), // 10 seconds
    );

    // Appointment endpoints
    protectedInternalRoutes.get("/profile/appointments/:type",
      { schema: schemaMyAppointments },
      endpointTimeout(routeMyAppointments, 10000), // 10 seconds
    );
    protectedInternalRoutes.get("/profile/appointment/:id",
      { schema: schemaMyAppointment },
      endpointTimeout(routeMyAppointment, 10000), // 10 seconds
    );
    protectedInternalRoutes.post("/appointments/book",
      { schema: schemaBookAppointment },
      endpointTimeout(routeBookAppointment, 10000), // 10 seconds
    );
    protectedInternalRoutes.patch("/appointment/:id/amend",
      { schema: schemaAmendAppointment },
      endpointTimeout(routeAmendAppointment, 10000), // 10 seconds
    );
  },
  prefix: '/auth/internal',
});

export default protectedInternalRoutes;