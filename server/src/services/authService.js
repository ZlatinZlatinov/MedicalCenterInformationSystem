const { blackList } = require('../utils/blacklist');
const { createToken } = require('../utils/jwt');
const { findUserByEmail, createUser } = require('./userServices');

async function loginUser(email, password) {
    const user = await findUserByEmail(email);

    if(!user.isVerified) {
        throw new Error("Please verify your email!");
    }

    const isValid = await user.validate(password);

    if (!isValid) {
        throw new Error("Wrong email or password!");
    }

    const token = createToken(user);

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token
    }
}

async function registerUser(userData) {
    const isExisting = findUserByEmail(userData.email);

    if (isExisting) {
        throw new Error("User already exists!");
    }

    const user = await createUser(userData);

    return createToken(user);
}

async function logOutUser(token) {
    blackList.add(token);
}

module.exports = {
    loginUser,
    logOutUser,
    registerUser
}