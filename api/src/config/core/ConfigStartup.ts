// Imports
import mongoose from "mongoose";
import ENV from "../../types/core/ENV.js";

/**
 * Function to execute tasks on server startup
 * @AJGamesArchive
 */
const startupTasks = (
  envs: ENV,
): ((
  error: Error | null,
  address: string,
) => Promise<void>) =>
  (async (
    error: Error | null,
    address: string
  ) => {
    if(error) {
      console.error(error);
      console.info("Failed to start the server");
      console.info("Closing database connection...");
      await mongoose.disconnect();
      console.info("Database connection closed!");
      process.exit(1);
    };
    console.info(`API ready on: (${address}) | (http://localhost:${envs.PORT})`);
    return;
  });

export default startupTasks;