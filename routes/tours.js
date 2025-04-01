const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// GET all tours - accessible to any logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Create a new tour - accessible only to admin users
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Update a tour by ID - accessible only to admin users
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ message: 'Tour not found' });
    res.json(updatedTour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove a tour by ID - accessible only to admin users
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
