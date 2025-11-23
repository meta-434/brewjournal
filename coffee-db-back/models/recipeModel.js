require("dotenv").config();
const { eq } = require("drizzle-orm");
const db = require("../drizzle.js");

const getAllRecipes = async () => {
  const result = await db.select().from(recipes);
  return result[0] ?? null;
};

const getRecipesByUser = async (username) => {
  const result = await db
    .select({
      recipeId: recipes.id,
    })
    .from(recipes)
    .innerJoin(users, eq(recipes.userId, users.id))
    .where(eq(users.name, username));
};
