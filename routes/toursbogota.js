const express = require('express');
const router = express.Router();
const Tour = require('../models/TourBogota');  // Ensure the model includes your new fields

// GET all tours (Bogotá)
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single tour by ID
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Create a new tour (including transportation pricing arrays)
router.post('/', async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Update a tour by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTour) return res.status(404).json({ message: 'Tour not found' });
    res.json(updatedTour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove a tour by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

