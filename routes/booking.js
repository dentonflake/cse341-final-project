// Import necessary modules
const express = require('express');

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
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

// Export the router
module.exports = router;
