// Imports
import dotenv from 'dotenv';
import ENV from '../../types/core/ENV.js';

/**
 * Function to load and validate environment variables
 * @returns Object of configured ENVs
 * @AJGamesArchive
 */
function configureENVs(): ENV {
  // Load core ENVs
  dotenv.config();

  // Load environment-specific ENVs
  if(process.env.NODE_ENV === 'cloud') {
    dotenv.config({ path: '.env.cloud' });
  };
  if(process.env.NODE_ENV === 'local') {
    dotenv.config({ path: '.env.local' });
  };

  // Validate ENVs
  const missing: string[] = [];
  if(!Number.isNaN(process.env.PORT)) missing.push('PORT');
  if(!process.env.HOST) missing.push('HOST');
  if(!process.env.JWT_SECRET) missing.push('JWT_SECRET');
  if(!process.env.DB_URL) missing.push('DB_URL');
  if(missing.length > 0) {
    console.error(`Failed to load the following ENVs:\n\n${missing.join('\n')}\n\nPlease ensure you have all required ENVs files setup correctly. See the README file for details.`);
    process.exit(1);
  };

  // Return configured ENVs
  return {
    PORT: Number(process.env.PORT),
    HOST: process.env.HOST || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    DB_URL: process.env.DB_URL || '',
  };
};

export default configureENVs;