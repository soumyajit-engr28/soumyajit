const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

<<<<<<< HEAD
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
=======
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
>>>>>>> 5314396c1dc5f785501bc90bad7e02007cf257ad

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

<<<<<<< HEAD
    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
=======
    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
>>>>>>> 5314396c1dc5f785501bc90bad7e02007cf257ad
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
<<<<<<< HEAD
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
=======
      { id: user._id, email: user.email },
      "your_jwt_secret",   // replace with process.env.JWT_SECRET later
>>>>>>> 5314396c1dc5f785501bc90bad7e02007cf257ad
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;