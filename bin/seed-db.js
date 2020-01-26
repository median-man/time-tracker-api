#!/usr/bin/env node
/**
 * Load enviornment vars.
 */
require("dotenv").config();

/**
 * Module dependencies.
 */
const debug = require("debug")("time-tracker-api:seed-db");
const db = require("../db");
const User = require("../models/User");

/**
 * Connect to the database.
 */
db.connect()
  .catch(() => {
    debug("DB connection error. Shutting down.");
    process.exit(1);
  })
  .then(async () => {
    await User.deleteMany({});
    const result = await User.insertMany([
      {
        punches: [
          {
            type: "in",
            timeStamp: Date.parse("2020-01-25T13:09:00")
          },
          {
            type: "out",
            timeStamp: Date.parse("2020-01-25T14:09:00")
          }
        ]
      }
    ]);
    debug(`Inserted ${result.length} new user(s).`)
    process.exit(0)
  })
  .catch(error => {
    debug("Error seeding the db: %O", error)
    process.exit(1)
  });
