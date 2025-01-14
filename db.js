import 'dotenv/config';
import postgres from 'postgres';

// process.env -> variável global do node onde são guardadas as variáveis ambiente
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

export const sql = postgres(URL, { ssl: 'require' });
