'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';
const database = require('./database/database');
const cors = require('cors');

const app = express();

const task = require('./routes/task.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// cors
app.use(cors({credentials: true, origin: '*'}));

// routes
app.use('/task', task);

// server
const server = app.listen(port, () => {
  console.log("Server listening on " + port);
});

module.exports = app;
