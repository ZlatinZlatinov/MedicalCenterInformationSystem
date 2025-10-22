const { sendVerificationEmail } = require('../config/mail');
const { loginUser } = require('../services/authService');
const { createVerificationToken } = require('../services/tokenService');
const { createUser, findUserByEmail } = require('../services/userServices');
const { errorParser } = require('../utils/errorParser');

const authController = require('express').Router();

//TODO: Add data validation and sanitization

authController.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const accessToken = await loginUser(email, password);
        res.json({ accessToken });
    } catch (error) {
        const message = erorParser(err);
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

module.exports = {
    authController
}