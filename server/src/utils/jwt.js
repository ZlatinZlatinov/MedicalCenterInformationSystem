const jwt = require('jsonwebtoken');
const { blackList } = require('./blacklist');

//Create new token for user
function createToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        userName: user.username
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '4h'
    });
} 

//Verify token
function parseToken(token) {
    if(blackList.has(token)) {
        throw new Error("Token is blacklisted!");
    } 

    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createToken, 
    parseToken
}