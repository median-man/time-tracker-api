const exjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const debug = require("debug")("time-tracker-api:server:auth");
const User = require("../models/User");

const AUDIENCE = "hours-summary";
const ISSUER = "time-tracker-api";

// Create token verification middleware
exports.isAuthenticated = () =>
  exjwt({
    requestProperty: "auth",
    secret: process.env.SERVER_SECRET,
    audience: AUDIENCE,
    issuer: ISSUER
  });

// Authenticate user and create jwt
exports.logUserIn = async function(email, password) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Not found");
  }

  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    throw new Error("Invalid username or password.");
  }

  const now = Math.floor(Date.now() / 1000);
  const oneDayFromNow = now + 60 * 60 * 24;

  const claims = {
    exp: oneDayFromNow,
    iat: now,
    sub: user._id,
    iss: ISSUER,
    aud: AUDIENCE
  };

  const token = jwt.sign(claims, process.env.SERVER_SECRET);

  return { token, user };
};
