// Core imports
import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import mongoose from 'mongoose';

// Import routes
import routeAPIBuild from './routes/core/APIBuild.js';
import routeGetAllDOctors from './routes/GET/GetAllDoctors.js';

// Load ENVs
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

// Connect to the database
console.log("Connecting to the database...");
try {
  await mongoose.connect(dbURL);
} catch (err) {
  console.error(`Failed to connect to the database:\n\n${err}`);
  process.exit(1);
};
console.log("Connected to the database");

// Create API & Database Connection
const server = Fastify({ logger: false });
server.register(cors, {
	origin: [
    "http://localhost:5173",
  ],
});

// Create endpoints
server.get('/', {}, routeAPIBuild);
server.get('/doctors', {}, routeGetAllDOctors);

// Start server
server.listen({
  port: 80,
  host: '0.0.0.0'
}, async (error: Error | null, address: string) => {
		if (error) {
			server.log.error(error);
      await mongoose.disconnect();
      process.exit(1);
		};
		console.log(`API ready on: (${address}) | (http://localhost:80)`);
	},
);

// Listen for process termination signals to close the server
process.on('SIGTERM', () => {
	server.close().then(async () => {
		console.log('Server closed!');
		await mongoose.disconnect();
		process.exit(0);
	});
});
process.on('SIGINT', () => {
	server.close().then(async () => {
		console.log('Server closed!');
		await mongoose.disconnect();
		process.exit(0);
	});
});