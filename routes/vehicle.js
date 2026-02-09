// Import necessary modules
const express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');

// Create a new router instance
const router = express.Router();

// Import controller functions
const {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicle');

// Define routes
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById);
router.post('/', isAuthenticated, createVehicle);
router.put('/:id', isAuthenticated, updateVehicle);
router.delete('/:id', isAuthenticated, deleteVehicle);

// Export the router
module.exports = router;
