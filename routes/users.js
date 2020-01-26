const express = require("express");
const debug = require("debug")("time-tracker-api:server");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// get user by the user id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// create a new punch for user
router.post("/:id/punches", async (req, res) => {
  try {
    await User.createPunch(req.params.id, {
      type: req.body.type,
      timeStamp: req.body.timeStamp
    });
    res.send("punch added");
  } catch (error) {
    if (error.name && error.name === "CastError") {
      debug("Error trying to create punch. %s", error.message);
      res.status(400);
    } else {
      res.status(500);
    }
    res.end();
  }
});

module.exports = router;
