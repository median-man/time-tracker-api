const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
// const path = require('path');
// TODO: uninstall cookieParser if not using cookies for session management
// const cookieParser = require('cookie-parser');
const logger = require("morgan");

// const indexRouter = require('./routes/index');
// const usersRouter = require("./routes/users");

const app = express();

// TODO: use logger conditionally based on NODE_ENV
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO: remove cookieParser if not using cookies...
// app.use(cookieParser());

// TODO: limit allowed urls to a whitelist
app.use(cors());

// app.use('/', indexRouter);
// app.use("/users", usersRouter);

module.exports = app;
