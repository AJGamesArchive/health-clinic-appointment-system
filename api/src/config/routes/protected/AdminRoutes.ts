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
import schemaPatchPatient from "../../../schema/accounts/SchemaPatchPatient.js";
import routePatchPatient from "../../../routes/accounts/RoutePatchPatient.js";
import schemaPatchDoctor from "../../../schema/accounts/SchemaPatchDoctor.js";
import routePatchDoctor from "../../../routes/accounts/RoutePatchDoctor.js";
import schemaPatchAdmin from "../../../schema/accounts/SchemaPatchAdmin.js";
import routePatchAdmin from "../../../routes/accounts/RoutePatchAdmin.js";
import schemaPostAccount from "../../../schema/accounts/SchemaPostAccount.js";
import routePostAccount from "../../../routes/accounts/RoutePostAccount.js";
import schemaDeleteAccount from "../../../schema/accounts/SchemaDeleteAccount.js";
import routeDeleteAccount from "../../../routes/accounts/RouteDeleteAccount.js";

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

    //Update patient details to an account by ID
    protectedAdminRoutes.patch("/patient/:id",
      { schema: schemaPatchPatient},
      endpointTimeout(routePatchPatient, 10000), // 10 Seconds
    );

    //Update doctor details to an account by ID
    protectedAdminRoutes.patch("/doctor/:id",
      { schema: schemaPatchDoctor},
      endpointTimeout(routePatchDoctor, 10000), // 10 Seconds
    );

    //Update admin details to an account by ID
    protectedAdminRoutes.patch("/admin/:id",
      { schema: schemaPatchAdmin},
      endpointTimeout(routePatchAdmin, 10000), // 10 Seconds
    );

    //Create Base admin account
    protectedAdminRoutes.post("/admin/account",
      { schema: schemaPostAccount},
      endpointTimeout(routePostAccount, 10000), // 10 Seconds
    );

    //delete account by ID
    protectedAdminRoutes.delete("/admin/account/:id",
      { schema: schemaDeleteAccount},
      endpointTimeout(routeDeleteAccount, 10000), // 10 Seconds
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