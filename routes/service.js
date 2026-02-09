// Import necessary modules
const express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');

// Create a new router instance
const router = express.Router();

// Import controller functions
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/service');

// Define routes
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', isAuthenticated, createService);
router.put('/:id', isAuthenticated, updateService);
router.delete('/:id', isAuthenticated, deleteService);

// Export the router
module.exports = router;
