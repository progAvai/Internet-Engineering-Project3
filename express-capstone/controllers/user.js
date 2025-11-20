// controllers/user.js
const User = require('../models/user'); // وارد کردن مدل

const getAllUsers = (req, res) => {
    const users = User.getAll();
    res.status(200).json(users);
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = User.getById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
};

const createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    const newUser = User.create({ name, email });
    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedUser = User.update(id, req.body);
    if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const success = User.remove(id);
    if (!success) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};