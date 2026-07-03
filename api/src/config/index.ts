import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const getRequiredEnv = (name: string, fallback?: string): string => {
  const value = process.env[name];

  if (value) {
    return value;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error(`${name} must be defined in production environment`);
  }

  if (fallback !== undefined) {
    return fallback;
  }

  return '';
};

const getSecretEnv = (name: string): string => {
  const value = process.env[name];
  
  if (!value) {
    throw new Error(
      `${name} must be defined. Critical secrets cannot have fallbacks. ` +
      `Ensure ${name} is set in environment variables.`
    );
  }
  
  return value;
};

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: Number(process.env.PORT || 4000),
  database_url: getRequiredEnv('MONGODB_URI'),
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12),
  jwt_access_secret: getSecretEnv('JWT_ACCESS_SECRET'),
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
  jwt_refresh_secret: getSecretEnv('JWT_REFRESH_SECRET'),
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
};
