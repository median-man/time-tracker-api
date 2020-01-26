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

router.put("/:userId/punches/:punchId", async (req, res) => {
  try {
    await User.updatePunch(req.params.userId, {
      id: req.params.punchId,
      type: req.body.type,
      timeStamp: req.body.timeStamp
    })
    res.send("Punch updated")
  } catch (error) {
    debug("Error trying to update punch. %s", error.message)
    res.status(400)
    res.end()
  }
})

router.delete("/:userId/punches/:punchId", async (req, res) => {
  try {
    await User.removePunch(req.params.userId, req.params.punchId)
    res.send("Punch deleted")
  } catch (error) {
    debug("Error trying to delete punch. %s", error.message)
    res.status(400)
    res.end()
  }
})

module.exports = router;
