const express = require('express');
// const path = require('path');
// TODO: uninstall cookieParser if not using cookies for session management
// const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

// TODO: use logger conditionally based on NODE_ENV
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO: remove cookieParse if not using cookies...
// app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
