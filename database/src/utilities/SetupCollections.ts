// Import models
import mongoose from "mongoose";
import dataCreationPromises from "../static/Data.js";

/**
 * Function to reset and create all collections
 */
async function setupCollections(): Promise<void> {
  console.log("Setting up collections...");
  if(mongoose.connection.readyState === 0 || !mongoose.connection.db) throw new Error("Database connection not open");

  // Fetch live collections and all collections to setup
  const liveCollections = await mongoose.connection.db?.listCollections().toArray();

  // Drop all live collections
  if(liveCollections.length !== 0) {
    console.log("Dropping live collections...");
    for(const collection of liveCollections) {
      console.log(`Dropping collection: ${collection.name}`);
      await mongoose.connection.db.dropCollection(collection.name);
    };
    console.log(`${liveCollections.length} Live collections dropped`);
  } else {
    console.log("No live collections to drop");
  };

  // Create all collections
  if(dataCreationPromises.length !== 0) {
    console.log("Creating collections and inserting default data...");
    const createdCollections = await Promise.all(dataCreationPromises);
    for(const collection of createdCollections) {
      console.log(`Created collection: ${collection[0].collection.name}`);
      console.log(`Inserted the following documents:\n${JSON.stringify(collection, null, 2)}`);
    };
    console.log(`${createdCollections.length} collections created`);
  } else {
    console.log("No collections to create");
  };

  console.log("Collections setup complete");
  return;
};

export default setupCollections;