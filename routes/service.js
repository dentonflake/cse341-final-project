// Import necessary modules
const express = require('express');

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
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

// Export the router
module.exports = router;
