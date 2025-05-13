// Imports
import mongoose from "mongoose";
import ENV from "../../types/core/ENV.js";

/**
 * Function to setup the database connection to MongoDB
 * @AJGamesArchive
 */
function connectDatabase(envs: ENV): void {
  // Connect to the database
  console.info("Connecting to the database...");
  mongoose
    .connect(envs.DB_URL)
    .then(() => {
      console.info("Connected to the database");
    })
    .catch((err) => {
      console.error(`Failed to connect to the database:\n\n${err}`);
      process.exit(1);
    });
};

export default connectDatabase;