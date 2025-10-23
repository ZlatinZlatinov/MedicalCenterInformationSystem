const EmailToken = require('../models/EmailToken');
const User = require('../models/User');

async function createVerificationToken(userId) {
    return EmailToken.create({ userId: userId });
}

async function getTokenRecord(token) {
    return EmailToken.findOne({ where: { token }, include: User });
}

module.exports = { 
    createVerificationToken,
    getTokenRecord
}