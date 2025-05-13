// Core imports
import Fastify from 'fastify';
import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import fastifyFormbody from '@fastify/formbody';
import ENV from './types/core/ENV.js';

// Import configs
import configureENVs from './config/core/ConfigENVs.js';
import connectDatabase from './config/core/ConnectDatabase.js';
import setupProcessEventListeners from './config/core/ConfigProcesses.js';
import CORSConfig from './config/core/ConfigCORS.js';
import startupTasks from './config/core/ConfigStartup.js';

// Import handlers
import handlerRouteNotFound from './config/handlers/HandlerRouteNotFound.js';

// Import routes
import coreRoutes from './config/routes/core/CoreRoutes.js';
import protectedInternalRoutes from './config/routes/protected/ProtectedInternalRoutes.js';

// Load ENVs
const envs: ENV = configureENVs();

// Connect to database
connectDatabase(envs);

// Create API server
const server: FastifyInstance = Fastify({ logger: false });

// Setup server configurations
server.register(cors, CORSConfig); // Setup CORS policy
server.register(fastifyJwt, { secret: envs.JWT_SECRET }); // Enable JWT
server.register(fastifyCookie); // Enable Cookies
server.register(fastifyHelmet); // Enforce HTTPS
server.register(fastifyFormbody); // Enable Form Body Parsing

// Setup handlers
server.setNotFoundHandler(handlerRouteNotFound);

// Core routes
server.register(coreRoutes);

// Setup protected internal routes
const protectedInternal = protectedInternalRoutes();
server.register(protectedInternal.routes, { prefix: protectedInternal.prefix });

// Start server
server.listen({
  port: envs.PORT,
  host: envs.HOST,
}, startupTasks(envs));

// Setup process event listeners
setupProcessEventListeners(server);

export default server;
export { envs };