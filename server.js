// server.js
require("dotenv").config();
const express = require("express");

const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createUser, getUser } = require("./dbFiles/operation");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const userData = req.body;
    await createUser(userData);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

// Login endpoint
// app.post("/api/login", async (req, res) => {
//   try {
//     const { user, pass } = req.body;
//     const userData = await getUser(user, pass);
//     if (userData) {
//       res.status(200).send("Login successful");
//     } else {
//       res.status(401).send("Invalid credentials");
//     }
//   } catch (error) {
//     res.status(500).send("Error logging in");
//   }
// });

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Authenticate user
    const user = await loginUser(email, password);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({ message: "Login successful", token }); // Send token in response
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
