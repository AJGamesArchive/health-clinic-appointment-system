// Imports
import mongoose from "mongoose";
import { FastifyInstance } from "fastify";

/**
 * Function to setup the node process event listeners
 * @AJG
 */
function setupProcessEventListeners(server: FastifyInstance): void {
  // Listen for process termination signals to close the server
  process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    console.info('Database connection closed!');
    await server.close();
    console.info('Server closed!');
    process.exit(0);
  });
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.info('Database connection closed!');
    await server.close();
    console.info('Server closed!');
    process.exit(0);
  });
  process.on('uncaughtException', async (error) => {
    console.error(`Uncaught exception: ${error}`);
    await mongoose.connection.close();
    console.info('Database connection closed!');
    await server.close();
    console.info('Server closed!');
    process.exit(1);
  });
  process.on('unhandledRejection', async (error) => {
    console.error(`Unhandled rejection: ${error}`);
    await mongoose.connection.close();
    console.info('Database connection closed!');
    await server.close();
    console.info('Server closed!');
    process.exit(1);
  });
  process.on('exit', async (code) => {
    console.info(`Process exited with code: ${code}`);
    await mongoose.connection.close();
    console.info('Database connection closed!');
    await server.close();
    console.info('Server closed!');
    process.exit(code);
  });
};

export default setupProcessEventListeners;