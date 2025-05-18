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
import schemaDeleteAppointment from "../../../schema/appointments/SchemaDeleteAppointment.js";
import routeDeleteAppointment from "../../../routes/appointments/RouteDeleteAppointment.js";
import schemaPatchSingleAccount from "../../../schema/accounts/SchemaPatchAccount.js";
import routePatchSingleAccount from "../../../routes/accounts/RoutePatchAccount.js";

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

    //Getting a single account by ID
    protectedAdminRoutes.get("/account/:id",
      {schema: schemaGetSingleAccount },
      endpointTimeout(routeGetSingleAccount, 5000), // 5 Seconds
    );

    //Update core details to an account by ID
    protectedAdminRoutes.patch("/account/:id",
      { schema: schemaPatchSingleAccount},
      endpointTimeout(routePatchSingleAccount, 10000), // 10 Seconds
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
    protectedAdminRoutes.delete("/appointment/:id",
      { schema: schemaDeleteAppointment },
      endpointTimeout(routeDeleteAppointment, 10000), // 10 Seconds
    );
  },
  prefix: '/admin',
});

export default protectedAdminRoutes;