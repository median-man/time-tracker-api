const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

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
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
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

// Execute before each user.save() call
userSchema.pre("save", async function() {
  // Break out if the password hasn't changed
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;
  }
});

userSchema.methods.verifyPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
