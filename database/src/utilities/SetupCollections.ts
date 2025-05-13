// Import models
import mongoose from "mongoose";
import dataCreationFunctions from "../static/Data.js";

/**
 * Function to drop the database and re-create everything
 */
async function setupCollections(): Promise<void> {
  console.log("Ensuring database is ready...")
  if(mongoose.connection.readyState === 0 || !mongoose.connection.db) throw new Error("Database connection not open");
  console.log(`Database connection is open to: ${mongoose.connection.name}`);

  // Fetch live collections and all collections to setup
  console.log("Fetching live collections...");
  const liveCollections = await mongoose.connection.db.listCollections().toArray();
  
  // Ensure all live collections are empty
  console.log("Verifying live collections are empty...");
  if(liveCollections.length !== 0) {
    console.log(`Detected ${liveCollections.length} live collections...`);
    console.log(`All ${liveCollections.length} Live collections verified successfully`);
  } else {
    console.log("No live collections to verify");
  };

  // Drop database to reset everything
  console.log("Dropping database...");
  await mongoose.connection.db.dropDatabase();
  console.log("Database dropped");
  console.log("Verifying database is empty...");
  const collections = await mongoose.connection.db.listCollections().toArray();
  if(collections.length !== 0) {
    console.error(`Database is not empty, found '${collections.length}' collections. Exiting...`);
    throw new Error(`Database is not empty, found '${collections.length}' collections`);
  };
  console.log("Database is empty");

  // Create all collections
  console.log("Setting up collections...");
  if(dataCreationFunctions.length !== 0) {
    console.log("Creating data insertion promises...");
    const promises = dataCreationFunctions.map((func) => func());
    console.log("Resolving insertion promises...");
    const insertedData = await Promise.all(promises);
    console.log(`Insertion promises resolved, ${insertedData.length} collections created`);
  } else {
    console.log("No collections to create");
  };

  // Return confirmation
  console.log("Collections setup complete");
  return;
};

export default setupCollections;