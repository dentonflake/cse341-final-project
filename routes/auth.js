// Import necessary modules
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import controller functions
const {
  login,
  logout
} = require('../controllers/auth');

// Define routes
router.get('/login', login);
router.get('/logout', logout);

// Export the router
module.exports = router;
