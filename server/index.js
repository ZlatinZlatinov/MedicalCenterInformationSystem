require('dotenv').config();

const express = require('express');
const { connectDB } = require('./src/config/db.js');
const { expressInit } = require('./src/config/expressInit.js');

startServer();

async function startServer() {
    const app = express();

    await connectDB();
    expressInit(app);
}
