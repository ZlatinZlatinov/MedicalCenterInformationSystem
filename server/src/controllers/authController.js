const authController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { sendVerificationEmail } = require('../config/mail');
const { loginUser, logOutUser } = require('../services/authService');
const { createVerificationToken, getTokenRecord } = require('../services/tokenService');
const { createUser, findUserByEmail } = require('../services/userServices');
const { errorParser } = require('../utils/errorParser');
const { hasUser } = require('../middlewares/guard');

authController.post('/login',
    body('email').trim().notEmpty().escape().bail().isEmail()
        .withMessage("Please enter valid email addres!"),
    body('password').trim().notEmpty().escape().bail().isLength({ min: 6 })
        .withMessage("Password should be atleast 6 characters long!"),
    async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            const payload = await loginUser(email, password);
            res.json(payload);
        } catch (error) {
            console.log("Oops, something went wrong: ", error);

            const message = errorParser(error);
            res.status(401).json({ message });
        }
    });

authController.post('/register',
    body('username').trim().notEmpty().escape().bail().isLength({ min: 5 })
        .withMessage("Username is required!"),
    body('email').trim().notEmpty().escape().bail().isEmail()
        .withMessage("Please enter valid email addres!"),
    body('password').trim().notEmpty().escape().bail().isLength({ min: 6 })
        .withMessage("Password should be atleast 6 characters long!"),
    body("confirmPassword").trim().notEmpty().escape().bail().isLength({ min: 6 })
        .withMessage("Confirm password should be atleast 6 characters long!"),
    async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }

            if (password !== confirmPassword) {
                return res.status(403).json({ message: "Password and confirm password fields should be equal!" });
            }

            const isExisting = await findUserByEmail(email);

            if (isExisting) {
                return res.status(409).json({ message: "User already exists!" });
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

authController.post('/logout', hasUser(),
    body('accessToken').trim().notEmpty().escape().isJWT()
        .withMessage("Invalid token!"),
    async (req, res) => {
        const token = req.body.accessToken;

        try {
            await logOutUser(token);
            res.status(204).json({ message: "User logged out." });
        } catch (error) {
            const message = errorParser(error);
            console.log(message);
            res.status(500).json({ message });
        }
    });

authController.post('/verify-email',
    body("verificationToken").trim().notEmpty().escape()
        .withMessage("Invalid verification token!"),
    async (req, res) => {
        try {
            const token = req.body.verificationToken;

            if (!token) {
                return res.status(400).json({ message: "Invalid token!" });
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
            const message = errorParser(error);

            res.status(400).json({ message });
        }
    });

module.exports = {
    authController
}