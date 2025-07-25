const express = require('express');
const cors = require('cors');
const path = require('path');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');

// Route files
const tasks = require('./routes/tasks');
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/auth', auth);

// Error handler middleware
app.use(errorHandler);

module.exports = app;