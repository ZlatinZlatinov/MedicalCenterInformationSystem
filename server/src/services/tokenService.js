const EmailToken = require('../models/EmailToken');

async function createVerificationToken(userId) {
    return EmailToken.create({ UserId: userId });
}

module.exports = { createVerificationToken }