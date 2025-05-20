// Imports
import mongoose from "mongoose";
import dotenv from "dotenv";
import generateMockData from "./utilities/GenerateData.js";
import insertData from "./utilities/InsertData.js";

/**
 * Main script function to avoid callback hell
 */
async function data() {
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

  // Manage data generation
  try {
    // Generate mock data
    console.log("Generating mock data...");
    const mockData = await generateMockData({
      patientCount: 100,
      doctorCount: 50,
      adminCount: 30,
      appointmentCount: 300,
      medicalHistoryCount: 500,
    });

    // Insert mock data into the database
    console.log("Inserting mock data into the database...");
    await insertData(mockData, process.env.NODE_ENV === 'local');
    console.log("Mock data inserted successfully");
  } catch (err: any) {
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

data();