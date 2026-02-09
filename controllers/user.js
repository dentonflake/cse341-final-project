const mongoose = require('mongoose');
const User = require('../models/user');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllUsers = async (req, res) => {

  // #swagger.tags=['User']

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

const getUserById = async (req, res) => {

  // #swagger.tags=['User']

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid user id.' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
};

const createUser = async (req, res) => {

  // #swagger.tags=['User']

  const { firstName, lastName, email, phone, role, isActive } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      role,
      isActive
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to create user.' });
  }
};

const updateUser = async (req, res) => {

  // #swagger.tags=['User']

  const { id } = req.params;
  const { firstName, lastName, email, phone, role, isActive } = req.body;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid user id.' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, phone, role, isActive },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to update user.' });
  }
};

const deleteUser = async (req, res) => {

  // #swagger.tags=['User']

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid user id.' });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
