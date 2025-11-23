const postgres = require("postgres");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sql = postgres(process.env.DATABASE_URL);

async function nuke() {
  console.log("Dropping public schema...");
  await sql.unsafe(
    "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;",
  );

  console.log("Cleaning drizzle folder...");

  const drizzleDir = path.resolve("./drizzle");
  const keepFiles = new Set(["nuke.js", "down.js"]);
  const keepDirs = new Set(["migrations"]);

  fs.readdirSync(drizzleDir).forEach((file) => {
    const fullPath = path.join(drizzleDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && !keepFiles.has(file)) {
      fs.rmSync(fullPath, { force: true });
      console.log(`Deleted file: ${file}`);
    }

    if (stat.isDirectory() && !keepDirs.has(file)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Deleted folder: ${file}`);
    }
  });

  console.log("Done!");
  process.exit(0);
}

nuke().catch((err) => {
  console.error(err);
  process.exit(1);
});
