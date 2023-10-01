const logger = require("../../logger/logger");
const User = require("../models/userModel");
const { validateUserSignup } = require("../utils/validators");

exports.signup = async (req, res, next) => {
  try {
    // Validate the request body
    const { error, value } = validateUserSignup(req.body);
    if (error) return res.status(400).send(error.details);
    
    const { username, password } = value;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    logger.info(`User - [${username}] registered successfully`)
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error("Error in user signup:", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};
