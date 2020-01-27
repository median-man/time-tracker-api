const mongoose = require("mongoose");
const debug = require("debug")("time-tracker-api:db");

const DISCONNECTED = 0;

module.exports.connect = () => {
  if (mongoose.connection.readyState === DISCONNECTED) {
    mongoose.connection.on("error", error => debug("Error: %O", error));
    mongoose.connection.once("open", () => debug("connected to mongodb"));
    return mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/timetracker",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
  }
  return mongoose;
};
