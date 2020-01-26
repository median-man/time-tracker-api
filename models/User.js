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
})

const userSchema = new Schema({
  punches: [punchSchema]
});

userSchema.static("createPunch", function(userId, newPunch, options) {
  console.log(userId, newPunch, options)
  return this.findByIdAndUpdate(userId, { $push: { punches: newPunch }}, options)
})

module.exports = mongoose.model("User", userSchema);
