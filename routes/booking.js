// Import necessary modules
const express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');

// Create a new router instance
const router = express.Router();

// Import controller functions
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/booking');

// Define routes
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/', isAuthenticated, createBooking);
router.put('/:id', isAuthenticated, updateBooking);
router.delete('/:id', isAuthenticated, deleteBooking);

// Export the router
module.exports = router;
