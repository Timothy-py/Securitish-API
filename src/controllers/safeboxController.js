const logger = require("../../logger/logger");
const Safebox = require("../models/safeboxModel");
const {
  validateCreateSafebox,
} = require("../utils/validators");

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Create a safebox
 * @route `/api/v1/safeboxes
 * @access Private
 * @type POST
 */
exports.createSafebox = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateCreateSafebox(req.body);
    if (error) return res.status(400).send(error.details);

    const { name, password } = value;

    // Create a new Safebox instance
    const newSafebox = new Safebox({
      name,
      password,
      _userId: req.user._id,
    });

    // Save the safebox to the database
    const data = await newSafebox.save();

    logger.info(`New safebox created - ${data.id}`);
    return res
      .status(201)
      .json({ message: "Safebox created successfully", data: data });
  } catch (error) {
    // catch duplicate key error
    if (error.code === 11000 || error.code === 11001) {
      return res
        .status(409)
        .json({ message: "Safebox with name already exist" });
    }

    logger.error("Error creating safebox:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};