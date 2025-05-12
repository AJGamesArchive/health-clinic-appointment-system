// Import models
import mongoose from "mongoose";
import dataCreationPromises from "../static/Data.js";
import sleep from "./Sleep.js";
import Accounts from "../schemas/Accounts.js";

//TODO Something in this script and/or MongoDB is fucked! It will NOT under ANY syntax wipe the database and re-create it! IT DOES NOT WORK!!!! It needs fixing, somehow. Good fucking luck... I've tried extensivelyyyyyyyyyyyy
//TODO I KNOW WHY THIS SCRIPT IS BEING FUCKY, I WILL FIX AFTER AUTH SYSTEM IS DONE - Alex
//TODO This function needs to use the dataCreationPromises array to create an array of promises that can all then be asyncranessly resolved

/**
 * Function to reset and create all collections
 */
async function setupCollections(): Promise<void> {
  const conn = mongoose.connection;
  console.log("Ensuring database is ready...")
  if(conn.readyState === 0 || !conn.db) throw new Error("Database connection not open");
  console.log(`Database connection is open to: ${conn.name}`);

  // Tear down database
  // Don't bother, mongodb is a little 💩 and won't let you
  // BUT you can just check the collections are empty :)

  // Fetch live collections and all collections to setup
  console.log("Fetching live collections...");
  const liveCollections = await conn.db?.listCollections().toArray();
  
  // Ensure all live collections are empty
  console.log("Verifying live collections are empty...");
  if(liveCollections.length !== 0) {
    console.log(`Detected ${liveCollections.length} live collections...`);
    for(const collection of liveCollections) {
      console.log(`Verifying collection: ${collection.name}`);
      let docCount: number = await conn.db.collection(collection.name).countDocuments();
      if(docCount !== 0) {
        console.error(`Collection is not empty, found '${docCount}' documents. Dropping...`);
        await conn.db.collection(collection.name).drop();
        await sleep(2000)
        console.log("count: " + await conn.db.collection(collection.name).countDocuments())
        console.log(`Collection '${collection.name}' dropped`);
        docCount = await conn.db.collection(collection.name).countDocuments();
        if(docCount !== 0) {
          console.error(`Collection still exists, found '${docCount}' documents. Exiting...`);
          throw new Error(`Collection still exists, found '${docCount}' documents`);
        };
      };
      console.log(`Collection '${collection.name}' is empty`);
    };
    console.log(`All ${liveCollections.length} Live collections verified successfully`);
  } else {
    console.log("No live collections to verify");
  };

  // Ensure all collections are empty
  console.log("Awaiting all transactions to complete...");
  await sleep(10000);
  console.log("Verifying all collections are empty...");
  for (const collection of liveCollections) {
    let docCount: number = await conn.db.collection(collection.name).countDocuments();
    if (docCount !== 0) {
      console.log("Collection isn't empty, retrying...");
      await sleep(10000);
      docCount = await conn.db.collection(collection.name).countDocuments();
      if (docCount !== 0) {
        console.error("Collections still exist, exiting...");
        throw new Error("Collections still exist");
      };
    };
  };

  // Create all collections
  console.log("Setting up collections...");
  if(dataCreationPromises.length !== 0) {
    console.log("Creating collections and inserting default data...");
    const accounts = await dataCreationPromises[0]();
    console.log(`Accounts created: ${accounts}`);
    console.log(`Verifying accounts in DB: ${await Accounts.countDocuments()}`);
    const createdCollections = await Promise.all(dataCreationPromises);
    // for(const collection of createdCollections) {
    //   console.log(`Created collection: ${collection[0].collection.name}`);
    //   console.log(`Inserted the following documents:\n${JSON.stringify(collection, null, 2)}`);
    // };
    console.log(`${createdCollections.length} collections created`);
  } else {
    console.log("No collections to create");
  };

  console.log("Collections setup complete");
  return;
};

export default setupCollections;