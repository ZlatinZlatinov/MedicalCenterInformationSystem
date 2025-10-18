const User = require('../models/User');

async function findUserById(id) {
    return User.findByPk(id);
}

async function findAllUsers(limit, offset) {
    return User.findAll({ limit, offset });
}

async function findUserByEmail(email) {
    const newUser = await User.findOne({ where: { email } });
    return newUser;
}

async function updateUser(id, user) {
    const updatedUser = await User.update(user, { where: { id } });
    return updatedUser;
}

async function deleteUser(id) {
    const deletedUser = await User.destroy({ where: { id } });
    return deletedUser;
}

module.exports = {
    findUserById,
    findAllUsers,
    findUserByEmail,
    updateUser,
    deleteUser
};