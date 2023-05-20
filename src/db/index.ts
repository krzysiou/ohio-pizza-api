import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const PostgresClient = new Client({
  connectionString: process.env.DATABASE_CONNECTION_STRING as string,
});

const initDBConnection = async () => {
  await PostgresClient.connect().catch((err) => {
    console.log(err);
  });
};

export { initDBConnection, PostgresClient };
