const exjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const debug = require("debug")("time-tracker-api:server:auth");
const User = require("../models/User");

// Init the express-jwt middleware
exports.isAuthenticated = () =>
  exjwt({
    secret: process.env.SERVER_SECRET
  });

exports.logUserIn = async function(email, password) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Not found");
  }

  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    throw new Error("Invalid username or password.");
  }

  let token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SERVER_SECRET,
    { expiresIn: 129600 }
  );

  return {
    token,
    user: {
      ...user.toObject(),
      password: null
    }
  };
};
