require("dotenv").config();
const { eq } = require("drizzle-orm");
const jwt = require("jsonwebtoken");
const db = require("../drizzle.js");
const { users } = require("../db/schema");
const runtime = require("../runtime/runtime");

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
const saltRounds = 10;

/**
 * Create a new user in the database.
 * Internal-only helper used by registerUser().
 */
const createUser = async (name, email, hashedPassword) => {
  const result = await db
    .insert(users)
    .values({ name, email, password: hashedPassword })
    .returning();

  return result[0]; // drizzle returns inserted row
};

/**
 * Get a user by ID.
 */
const getUserById = async (id) => {
  const result = await db.select().from(users).where(eq(users.id, id));

  return result[0] ?? null;
};

/**
 * Get a user by username.
 */
const getUserByUsername = async (username) => {
  console.log(`\n looking for ${username} in database with users.name`);
  const result = await db.select().from(users).where(eq(users.name, username));
  console.log("result of that search is...", result);
  return result[0] ?? null;
};

/**
 * Update a user by ID.
 */
const updateUserById = async (id, userData) => {
  const result = await db
    .update(users)
    .set(userData)
    .where(eq(users.id, id))
    .returning();

  return result[0] ?? null;
};

/**
 * Delete a user by ID.
 */
const deleteUser = async (id) => {
  const result = await db.delete(users).where(eq(users.id, id)).returning();

  return result[0] ?? null;
};

/**
 * Registers a new user.
 * Handles hashing + DB insert + JWT creation.
 */
const registerUser = async (name, email, password) => {
  const hashedPassword = await runtime.hash(password, saltRounds);

  const user = await createUser(name, email, hashedPassword);
  if (!user) throw new Error("Failed to register user");

  const token = jwt.sign(
    {
      id: process.env.HIDE_USERID ? null : user.id,
      name: user.name,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: "7d" },
  );

  return token;
};

/**
 * Log in a user. Checks password + returns JWT.
 */
const loginUser = async (username, email, password) => {
  const user = await getUserByUsername(username);
  if (!user) throw new Error("User not found");

  const isMatch = await runtime.compareHash(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      id: process.env.HIDE_USERID ? null : user.id,
      name: user.name,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: "7d" },
  );

  return token;
};

/**
 * Verifies a JWT token.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  // CRUD
  createUser,
  getUserById,
  getUserByUsername,
  updateUserById,
  deleteUser,

  // Auth
  registerUser,
  loginUser,
  verifyToken,
};
