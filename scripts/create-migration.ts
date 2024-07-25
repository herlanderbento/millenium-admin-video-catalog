import { execSync } from 'child_process';
import * as path from 'path';

const args = process.argv.slice(2);
const moduleName = args[0];
const migrationName = args[1];

if (!moduleName || !migrationName) {
  console.error('Usage: npm run migrate:create <module-name> <migration-name>');
  process.exit(1);
}

const folderPath = path.join(
  __dirname,
  '../src/core',
  moduleName,
  'infra/db/sequelize/migrations',
);
const command = `node -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/migrate.ts create --name ${migrationName} --folder ${folderPath} --allow-confusing-ordering`;

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Migration created successfully.');
} catch (error) {
  console.error('Error creating migration:', error.message);
}
