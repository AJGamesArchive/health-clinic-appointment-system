// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsAdmin from "../../../guards/IsAdmin.js";

// Import account endpoints
import schemaGetSingleAccount from "../../../schema/accounts/SchemaGetSingleAccount.js";
import routeGetSingleAccount from "../../../routes/accounts/RouteGetSingleAccount.js";

// Import appointment endpoints
import schemaAnyAppointments from "../../../schema/appointments/SchemaAnyAppointments.js";
import routeAnyAppointments from "../../../routes/appointments/RouteAnyAppointments.js";
import schemaAnyAppointment from "../../../schema/appointments/SchemaAnyAppointment.js";
import routeAnyAppointment from "../../../routes/appointments/RouteAnyAppointment.js";

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

    // Account endpoints
    protectedAdminRoutes.get("/account/:id",
      {schema: schemaGetSingleAccount },
      endpointTimeout(routeGetSingleAccount, 5000), // 5 Seconds
    );

    // Appointment endpoints
    protectedAdminRoutes.get("/appointments/:type",
      { schema: schemaAnyAppointments },
      endpointTimeout(routeAnyAppointments, 10000), // 10 Seconds
    );
    protectedAdminRoutes.get("/appointment/:id",
      { schema: schemaAnyAppointment },
      endpointTimeout(routeAnyAppointment, 10000), // 10 Seconds
    );
  },
  prefix: '/admin',
});

export default protectedAdminRoutes;