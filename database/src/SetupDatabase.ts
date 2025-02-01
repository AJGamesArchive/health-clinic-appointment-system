// Imports
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import setupCollections from './utilities/SetupCollections.js';

/**
 * Main script function to avoid callback hell
 */
async function main() {
  // Load ENVs
  console.log("Loading ENVs...");
  if(process.env.NODE_ENV === 'cloud') {
    dotenv.config({ path: '.env.cloud' });
  };
  if(process.env.NODE_ENV === 'local') {
    dotenv.config({ path: '.env.local' });
  };
  const dbURL: string | undefined = process.env.DB_URL;
  if(!dbURL) {
    console.error("Failed to load database URL from ENVs");
    process.exit(1);
  };
  console.log("ENVs loaded");

  // Connect to the database
  console.log("Connecting to the database...");
  try {
    await mongoose.connect(dbURL);
  } catch (err) {
    console.error(`Failed to connect to the database:\n\n${err}`);
    process.exit(1);
  };
  console.log("Connected to the database");

  // Preform the database setup
  try {
    await setupCollections();
  } catch (err) {
    console.error(`Failed to setup the database:\n\n${err}`);
    console.log("Closing database connection...");
    await mongoose.disconnect();
    process.exit(1);
  };

  // Confirm setup
  console.log("Closing database connection...");
  await mongoose.disconnect();
  console.log("Database setup complete");
  process.exit(0);
};

// Run the main script
main();