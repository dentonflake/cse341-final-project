const mongoose = require('mongoose');
const Service = require('../models/service');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllServices = async (req, res) => {

  // #swagger.tags=['Service']

  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services.' });
  }
};

const getServiceById = async (req, res) => {

  // #swagger.tags=['Service']

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid service id.' });
  }

  try {
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service.' });
  }
};

const createService = async (req, res) => {

  // #swagger.tags=['Service']

  const { name, description, price, durationMinutes } = req.body;

  try {
    const service = await Service.create({
      name,
      description,
      price,
      durationMinutes
    });

    res.status(201).json(service);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to create service.' });
  }
};

const updateService = async (req, res) => {

  // #swagger.tags=['Service']

  const { id } = req.params;
  const { name, description, price, durationMinutes } = req.body;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid service id.' });
  }

  try {
    const service = await Service.findByIdAndUpdate(
      id,
      { name, description, price, durationMinutes },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    res.status(200).json(service);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to update service.' });
  }
};

const deleteService = async (req, res) => {
  
  // #swagger.tags=['Service']

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid service id.' });
  }

  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    res.status(200).json({ message: 'Service deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service.' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
