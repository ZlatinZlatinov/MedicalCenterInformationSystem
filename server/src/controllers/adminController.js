const { getPendingUsers } = require('../services/adminService');
const { errorParser } = require('../utils/errorParser');

const adminController = require('express').Router();

adminController.get('/staff', async (req, res) => {
    const { filter } = req.query;
    
    //TODO: Make sure user id coresponds to the actual user
    let payload = [];

    try {
        switch (filter) {
            case 'pending':
            case 'doctors':
            case 'declined':
            case 'approved':
                payload = await getPendingUsers(filter);
                break;
            case 'nurses': break;
            default: break;
        }

        res.json(payload);
    } catch (error) {
        console.error(error);
        const message = errorParser(error);
        res.json({ message });
    }
});

module.exports = {
    adminController
}