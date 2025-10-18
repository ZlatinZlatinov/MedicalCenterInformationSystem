const userController = require('express').Router();
const { findUserById, createUser, updateUser, deleteUser } = require('../services/userServices');
//TODO: Add validation for the request body
//TODO: Add validation for the request params

userController.get( '/:id', async (req, res) => {
    try {
        const user = await findUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userController.post('/', async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userController.put('/:id', async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userController.delete('/:id', async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = userController;