import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import {
  users,
  gear,
  roasters,
  beans,
  roasts,
  recipes,
  recipe_steps,
} from "./schema.js";

// -----------------------------------------------
// DB SETUP
// -----------------------------------------------
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function seed() {
  console.log("🌱 Seeding database...");

  // -----------------------------------------------
  // USER
  // -----------------------------------------------
  const [user] = await db
    .insert(users)
    .values({
      name: "Alex",
      email: "alex@hapgood.me",
      password: "$2a$10$KCZDOKlG9ejclgP5WXx0WOZm1G2VN6pweFMj9Uzposi5gGNZltHHK", // hashed "Bretagne0"
    })
    .returning();

  console.log("User:", user);

  // -----------------------------------------------
  // ROASTER
  // -----------------------------------------------
  const [roaster] = await db
    .insert(roasters)
    .values({
      name: "Heart Coffee Roasters",
      country: "USA",
      website: "https://www.heartroasters.com",
    })
    .returning();

  console.log("Roaster:", roaster);

  // -----------------------------------------------
  // BEAN
  // -----------------------------------------------
  const [bean] = await db
    .insert(beans)
    .values({
      name: "Ethiopia Buku",
      origin: "Guji, Ethiopia",
      variety: "Heirloom",
      process: "Washed",
      roaster_id: roaster.id,
      notes: "Bright, floral, citrus-forward with a silky finish.",
    })
    .returning();

  console.log("Bean:", bean);

  // -----------------------------------------------
  // ROAST PROFILE
  // -----------------------------------------------
  const [roast] = await db
    .insert(roasts)
    .values({
      bean_id: bean.id,
      name: "Roast #42",
      roast_level: "Light",
      date_roasted: new Date("2025-01-15"),
    })
    .returning();

  console.log("Roast:", roast);

  // -----------------------------------------------
  // GEAR
  // -----------------------------------------------
  const [gearItem] = await db
    .insert(gear)
    .values({
      user_id: user.id,
      name: "Fellow Stagg EKG",
      type: "kettle",
      notes: "Temp set to 205°F",
    })
    .returning();

  console.log("Gear:", gearItem);

  // -----------------------------------------------
  // RECIPE
  // -----------------------------------------------
  const [recipe] = await db
    .insert(recipes)
    .values({
      user_id: user.id,
      title: "V60 Morning Ritual",
      description: "Bright, balanced pour-over with a juicy finish.",
      bean_id: bean.id,
      roast_id: roast.id,
      gear_id: gearItem.id,
      rating: 947,
    })
    .returning();

  console.log("Recipe:", recipe);

  // -----------------------------------------------
  // RECIPE STEPS
  // -----------------------------------------------
  const steps = await db
    .insert(recipe_steps)
    .values([
      {
        recipe_id: recipe.id,
        step_number: 1,
        instruction: "Bloom with 60g water for 45 seconds.",
        media_placeholder: "<image placeholder>",
      },
      {
        recipe_id: recipe.id,
        step_number: 2,
        instruction: "Pour in slow concentric circles up to 240g total water.",
        media_placeholder: "<image placeholder>",
      },
      {
        recipe_id: recipe.id,
        step_number: 3,
        instruction:
          "Finish with a final pulse pour to reach 300g total. Drawdown should complete in ~2:30.",
        media_placeholder: "<image placeholder>",
      },
    ])
    .returning();

  console.log("Steps:", steps);

  console.log("🌱 Seed completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
