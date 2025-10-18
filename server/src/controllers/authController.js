const { loginUser } = require('../services/authService');
const { createUser } = require('../services/userServices');

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
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    try {
        if (password !== confirmPassword) {
            throw new Error("Password and confirm password fields should be equal!");
        }

        //TODO: send an email to the User with verification code. 
        // After email is sent, add the user to db with status not verified. 
        const user = await createUser({ userName, email, password });

        res.json(user);
    } catch (error) {
        const message = erorParser(error);

        res.json({ message });
    }
});

module.exports = {
    authController
}