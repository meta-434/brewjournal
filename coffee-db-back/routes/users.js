const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.get("/test", async (req, res) => {
  res.status(200).json({ message: "users-you made it!" });
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Make sure required fields are present
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "username, email, and password are required" });
    }

    // Insert the user
    const newUser = await userModel.registerUser(username, email, password);

    // Respond with success
    res.status(200).json({
      message: "User created successfully",
      user: newUser, // optional, can omit sensitive fields
    });
  } catch (e) {
    console.error("Error creating user:", e);
    res.status(500).json({ error: `Failed to create user: ${e.message}` });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // TODO: make this not suck - pick email or password, or spend time to do both.
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "email, and password are required" });
    }

    const result = await userModel.loginUser(email, password);

    res.status(200).json({
      message: "login successful",
      token: result,
    });
  } catch (e) {
    console.error("Error logging in user:", e);
    res.status(500).json({ error: `Failed to log in user: ${e.message}` });
  }
});

module.exports = router;
