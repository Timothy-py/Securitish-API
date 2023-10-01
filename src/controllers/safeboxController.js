const logger = require("../../logger/logger");
const Content = require("../models/contentModel");
const Safebox = require("../models/safeboxModel");
const {
  validateCreateSafebox,
  validateAddContent,
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

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Add content to a safebox
 * @route `/api/v1/safeboxes/:id/contents
 * @access Private
 * @type POST
 */
exports.addContent = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateAddContent(req.body);
    if (error) return res.status(400).send(error.details);

    const { name, description } = value;

    const { id } = req.params;
    const { safeboxPassword } = req.query;

    // Execute operations and handle any errors
    const safeboxResult = await operations(req, id, safeboxPassword);

    if (safeboxResult.error) {
      // Handle the error returned from operations
      return res.status(safeboxResult.statusCode).send(safeboxResult.error);
    }

    // Create a new Content instance
    const newContent = new Content({
      name,
      description,
      _userId: req.user._id,
      _safeboxId: safeboxResult.data._id,
    });

    // Save the content to the database
    const data = await newContent.save();

    logger.info(`New content-[${data.id}] added to safebox-[${safeboxResult.data._id}]`);
    res
      .status(201)
      .json({ message: "Content added to the safebox successfully", data });
  } catch (error) {
    logger.error("Error adding content to safebox:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Get contents of a safebox
 * @route `/api/v1/safeboxes/:id/contents
 * @access Private
 * @type GET
 */
exports.getSafeboxContents = async (req, res) => {
  try {
    // Extract the safebox ID and password from the request parameters and query
    const { id } = req.params;
    const { safeboxPassword } = req.query;

    // Execute operations and handle any errors
    const safeboxResult = await operations(req, id, safeboxPassword);

    if (safeboxResult.error) {
      // Handle the error returned from operations
      return res.status(safeboxResult.statusCode).send(safeboxResult.error);
    }

    // Retrieve the contents associated with the safebox
    const contents = await Content.find({ _safeboxId: id });

    // Return the contents
    logger.info("Safebox contents retrieved successfully");
    return res.status(200).json(contents);
  } catch (error) {
    logger.error("Error retrieving safebox contents:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// *************Helper function*****************
const operations = async (req, id, safeboxPassword) => {
  try {
    // Find the safebox by its ID
    const safebox = await Safebox.findById(id);
    if (!safebox) {
      return { error: "Safebox not found", statusCode: 404 };
    }

    // Check if the user is the owner of the safebox
    const isOwner = safebox._userId.toString() === req.user._id.toString();
    if (!isOwner) {
      return { error: "Access denied!", statusCode: 401 };
    }

    // Verify safebox password provided
    const passwordCompare = await safebox.comparePassword(safeboxPassword);
    if (!passwordCompare) {
      return { error: "Unauthorized. Incorrect safebox password", statusCode: 401 };
    }

    // If all checks pass, return success
    return { success: true, data: safebox };
  } catch (error) {
    logger.error("Error during operations:", error)
    throw error; // Rethrow the error to be caught in the calling function
  }
};
