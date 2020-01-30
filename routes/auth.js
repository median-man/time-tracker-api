const express = require("express");
const debug = require("debug")("time-tracker-api:server");
const User = require("../models/User");
const auth = require("../config/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const result = await auth.logUserIn(req.body.email, req.body.password);
    res.json({ token: result.token, userId: result.user._id });
  } catch (error) {
    res.status(400).send("Invalid username or password.");
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    res.json(user);
  } catch (error) {
    debug("Error: %O", error);
    if (error.name && error.name === "ValidatorError") {
      res.status(401).send("Invalid or missing email or password.");
      return;
    }
    const DUPLICATE_KEY_ERROR_CODE = 11000;
    if (
      error.name === "MongoError" &&
      error.code === DUPLICATE_KEY_ERROR_CODE
    ) {
      res.status(403).send("Email must be unique.");
      return;
    }
    res.status(400).send("Unknown error.");
  }
});

module.exports = router;
