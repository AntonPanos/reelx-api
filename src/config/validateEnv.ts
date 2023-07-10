import { cleanEnv, port, str } from 'envalid';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ['development', 'production'],
    }),
    CLIENT_URL: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_URL: str(),
    DB_DBNAME: str(),
    PORT: port({ default: 3000 }),
    ACCESS_TOKEN_SECRET: str(),
    REFRESH_TOKEN_SECRET: str(),
  });
};

export default validateEnv;
