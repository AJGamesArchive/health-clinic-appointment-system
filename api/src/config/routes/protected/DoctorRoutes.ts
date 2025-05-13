// Imports
import { FastifyInstance } from "fastify";
import endpointTimeout from "../../../utilities/core/EndpointTimeout.js";

// Imports guards
import guardIsDoctor from "../../../guards/IsDoctor.js";

// Import routes & schemas
//TODO Insert doctor endpoints here

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

    // Test endpoints
    protectedDoctorRoutes.get("/test", //TODO Replace with actual doctor endpoints
      {},
      endpointTimeout(async (_req, rep) => rep.status(200).send(JSON.stringify({ message: "Hello Doctor!" }, null, 2)), 5000), // 5 seconds
    );
  },
  prefix: '/doctor',
});

export default protectedDoctorRoutes;