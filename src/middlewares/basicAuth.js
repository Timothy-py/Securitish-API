const basicAuth = require("basic-auth");
const User = require("../models/userModel");
const timeSafeCompare = require("tsscmp");

// Function to check for valid Basic Authentication credentials
async function basicAuthM(req, res, next) {
  const credentials = basicAuth(req);

  if (!credentials) return accessDeniedResp(res);

  const credentialValidity = await isValidCredentials(
    req,
    credentials.name,
    credentials.pass
  );

  if (credentialValidity) {
    // Valid credentials, proceed to the next middleware or route handler

    next();
  } else {
    // Invalid credentials or no credentials provided
    return accessDeniedResp(res);
  }
}

async function isValidCredentials(req, username, password) {
  const user = await User.findOne({ username });

  if (!user) return false;

  const passwordCompare = await user.comparePassword(password);
  const usernameCompare = timeSafeCompare(username, user.username);

  req.user = user;
  return passwordCompare && usernameCompare;
}

function accessDeniedResp(res) {
  res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
  res.status(401).send("Unauthorized");
}

module.exports = basicAuthM;
