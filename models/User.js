const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema({
  punches: [
    {
      type: {
        type: String,
        enum: ["in", "out"],
        required: true
      },
      timeStamp: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
