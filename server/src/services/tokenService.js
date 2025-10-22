const EmailToken = require('../models/EmailToken');

async function createVerificationToken(userId) {
    return EmailToken.create({ userId: userId });
}

module.exports = { createVerificationToken }