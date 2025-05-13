/**
 * CORS configuration for the API
 * @AJGamesArchive
 */
const CORSConfig = {
  origin: [
    'http://localhost:5173', // Allow Vite localhost server for development
  ],
  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
  ],
  credentials: true,
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 204,
  preflightContinue: false,
  preflightMaxAge: 86400, // 24 hours
};

export default CORSConfig;