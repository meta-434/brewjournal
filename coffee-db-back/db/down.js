const postgres = require("postgres");
const dotenv = require("dotenv");
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function down() {
  console.log("Dropping all tables in public schema...");

  // Drop all tables; CASCADE ensures foreign keys are handled
  await sql.unsafe(`
    DROP TABLE IF EXISTS recipe_steps CASCADE;
    DROP TABLE IF EXISTS recipes CASCADE;
    DROP TABLE IF EXISTS roasts CASCADE;
    DROP TABLE IF EXISTS beans CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS gear CASCADE;
    DROP TABLE IF EXISTS roasters CASCADE;
  `);

  console.log("Done!");
  process.exit(0);
}

down().catch((err) => {
  console.error(err);
  process.exit(1);
});
