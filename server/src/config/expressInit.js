const express = require('express');
const cors = require('cors');
const  { routes } = require('./routes.js');

function expressInit(app) {
    app.use(express.json());
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        allowedMethods: 'GET, POST, PUT, DELETE, OPTIONS',
        allowedHeaders: 'Contet-Type, Authorization',
    }));

    // app.use('/api', routes);

    const port = process.env.PORT || 3033;

    app.listen(port, () => {
        console.log(`Now listening on port ${port}.`);
    });
}

module.exports = { expressInit };