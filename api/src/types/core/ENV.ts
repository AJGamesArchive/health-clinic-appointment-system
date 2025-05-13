/**
 * Type to define the ENVs required for the API to run
 */
type ENV = {
  PORT: number;
  HOST: string;
  JWT_SECRET: string;
  DB_URL: string;
};

export default ENV;