const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const punchSchema = new Schema({
  type: {
    type: String,
    enum: ["in", "out"],
    required: true
  },
  timeStamp: {
    type: Number,
    required: true
  }
});

const userSchema = new Schema({
  punches: [punchSchema]
});

userSchema.static("createPunch", function(userId, newPunch, options) {
  console.log(userId, newPunch, options);
  return this.findByIdAndUpdate(
    userId,
    { $push: { punches: newPunch } },
    options
  );
});

userSchema.static("updatePunch", async function(
  userId,
  { id, type, timeStamp },
  options
) {
  const user = await this.findById(userId);
  const punch = user.punches.id(id);
  punch.type = type;
  punch.timeStamp = timeStamp;
  return user.save();
});

userSchema.static("removePunch", async function(userId, punchId) {
  const user = await this.findById(userId);
  user.punches.id(punchId).remove();
  return user.save();
});

module.exports = mongoose.model("User", userSchema);
