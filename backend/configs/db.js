import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

export const db = new Pool({
    connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
});