const mongoose = require('mongoose');
const Booking = require('../models/booking');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllBookings = async (req, res) => {

  // #swagger.tags=['Booking']

  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
};

const getBookingById = async (req, res) => {

  // #swagger.tags=['Booking']

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid booking id.' });
  }

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking.' });
  }
};

const createBooking = async (req, res) => {

  // #swagger.tags=['Booking']

  const {
    customerName,
    customerEmail,
    customerPhone,
    vehicleId,
    serviceId,
    appointmentDate,
    notes,
    status
  } = req.body;

  try {
    const booking = await Booking.create({
      customerName,
      customerEmail,
      customerPhone,
      vehicleId,
      serviceId,
      appointmentDate,
      notes,
      status
    });

    res.status(201).json(booking);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to create booking.' });
  }
};

const updateBooking = async (req, res) => {

  // #swagger.tags=['Booking']

  const { id } = req.params;
  const {
    customerName,
    customerEmail,
    customerPhone,
    vehicleId,
    serviceId,
    appointmentDate,
    notes,
    status
  } = req.body;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid booking id.' });
  }

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        customerName,
        customerEmail,
        customerPhone,
        vehicleId,
        serviceId,
        appointmentDate,
        notes,
        status
      },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.status(200).json(booking);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(422).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to update booking.' });
  }
};

const deleteBooking = async (req, res) => {

  // #swagger.tags=['Booking']

  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid booking id.' });
  }

  try {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    res.status(200).json({ message: 'Booking deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking.' });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};
