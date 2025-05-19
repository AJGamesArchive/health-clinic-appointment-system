// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsDoctor from "../../../guards/IsDoctor.js";
import schemaGetPatient from "../../../schema/accounts/SchemaGetPatient.js";
import routeGetPatient from "../../../routes/accounts/RouteGetPatient.js";

// Import appointment endpoints
import schemaPatientAppointments from "../../../schema/appointments/SchemaPatientAppointments.js";
import routePatientAppointments from "../../../routes/appointments/RoutePatientAppointments.js";
import schemaPatientAppointment from "../../../schema/appointments/SchemaPatientAppointment.js";
import routePatientAppointment from "../../../routes/appointments/RoutePatientAppointment.js";

/**
 * Function to declare all internally protected doctor routes
 * @AJGamesArchive
 */
const protectedDoctorRoutes = (): {
  routes: (protectedDoctorRoutes: FastifyInstance) => void;
  prefix: string;
} => ({
  routes: (
    protectedDoctorRoutes: FastifyInstance
  ): void => {
    // Guards
    protectedDoctorRoutes.addHook("onRequest", guardIsDoctor);

    // Appointment endpoints
    protectedDoctorRoutes.get("/patient/:patientId/appointments/:type",
      { schema: schemaPatientAppointments },
      endpointTimeout(routePatientAppointments, 10000), // 10 seconds
    );
    protectedDoctorRoutes.get("/patient/:patientId/appointment/:appointmentId",
      { schema: schemaPatientAppointment },
      endpointTimeout(routePatientAppointment, 10000), // 10 seconds
    );

    protectedDoctorRoutes.get("/doctor/:id",
      {schema: schemaGetPatient },
      endpointTimeout(routeGetPatient, 5000), // 5 Seconds
    );
  },
  prefix: '/doctor',
});

export default protectedDoctorRoutes;