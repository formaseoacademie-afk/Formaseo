import { pool } from './database';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations(): Promise<void> {
  if (!pool) {
    console.log('ℹ️ No PostgreSQL DATABASE_URL defined, skipping SQL schema execution.');
    return;
  }

  const client = await pool.connect();
  try {
    console.log('🔄 Executing PostgreSQL schema migrations (server/db_schema.sql)...');
    const schemaPath = path.join(__dirname, 'db_schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(sql);
    console.log('✅ PostgreSQL schema migrations applied successfully.');
  } catch (err) {
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
  }
}

// If executed directly: npx tsx server/migrate.ts
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
