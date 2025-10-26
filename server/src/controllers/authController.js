const { sendVerificationEmail } = require('../config/mail');
const { loginUser } = require('../services/authService');
const { createVerificationToken, getTokenRecord } = require('../services/tokenService');
const { createUser, findUserByEmail } = require('../services/userServices');
const { errorParser } = require('../utils/errorParser');

const authController = require('express').Router();

//TODO: Add data validation and sanitization
//TODO: improve error handling and proper status codes
authController.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const payload = await loginUser(email, password);
        res.json(payload);
    } catch (error) {
        console.log("Oops, something went wrong: ", error);

        const message = errorParser(error);
        res.status(401).json({ message });
    }
});

authController.post('/register', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        if (password !== confirmPassword) {
            throw new Error("Password and confirm password fields should be equal!");
        }

        const isExisting = await findUserByEmail(email);

        if (isExisting) {
            throw new Error("User already exists!");
        }

        const user = await createUser({ username, email, password });
        const token = await createVerificationToken(user.id);

        await sendVerificationEmail(email, token.token);

        res.status(201).json({ message: 'Verification email sent successfully!' });
    } catch (error) {
        console.log("Something went wrong", error);

        const message = errorParser(error);

        res.status(400).json({ message });
    }
});

authController.post('/logout', async (req, res) => {
    console.log("Logout not implemented yet!");
});

authController.post('/verify-email', async (req, res) => {
    try {
        const token = req.body.verificationToken;

        if (!token) {
            res.status(400).json({ message: "Invalid token!" });
        }

        const tokenRecord = await getTokenRecord(token);

        if (tokenRecord.expiresAt < new Date()) {
            await tokenRecord.destroy();

            return res.status(400).json({ message: "Token expired!" });
        }

        tokenRecord.User.isVerified = true;

        await tokenRecord.User.save();
        await tokenRecord.destroy();

        res.status(202).json({ message: "Email verified successfully." })
    } catch (error) {
        console.error("Oops, something went wrong: ", error);

        res.status(500).json({ message: "Server error :(" });
    }
});

module.exports = {
    authController
}