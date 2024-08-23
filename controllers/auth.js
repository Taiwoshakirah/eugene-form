const User = require("../models/auth");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, password });
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "eugeneKey",
      { expiresIn: "1h" }
    );

    res.status(201).json({ 
      message: "User created successfully", 
      user: { id: user._id, name: user.name, email: user.email, password:user.password },
      token 
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "eugeneKey",
      { expiresIn: "1h" }
    );
    res.status(200).json({ 
      message: "Sign in successful", 
      token 
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = { signUp, signIn };
