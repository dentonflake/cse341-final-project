// Import necessary modules
const express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');

// Create a new router instance
const router = express.Router();

// Import controller functions
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

// Define routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', isAuthenticated, createUser);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

// Export the router
module.exports = router;
