const express = require('express');
const apiRouter = require('./routers/api.router');
const {
  handleCustomErrors,
  handle500Errors
} = require('./errors/index.errors');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

// Error handling
app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
