const express = require('express');
const expError = require('./expressError');
const itemRoutes = require('./itemRoutes.js');

const app = express();

app.use(express.json());
app.use('/items',itemRoutes);

//404 handler
app.use(function(req, res, next) {
    return new expError.ExpressError('Not Found', 404);
});

//general errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message
    });
});

module.exports = app;