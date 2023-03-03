const express = require('express');
const expError = require('./expressError');
const itemRoutes = require('./itemRoutes.js');

const app = express();

app.use(express.json());
app.use('/items',itemRoutes);



module.exports = app;