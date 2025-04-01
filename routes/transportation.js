const express = require('express');
const router = express.Router();
const Transportation = require('../models/Transportation');

// GET a single document (by type, for example)
router.get('/', async (req, res) => {
  try {
    const doc = await Transportation.findOne({ type: "transportationPricing" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all documents
router.get('/all', async (req, res) => {
  try {
    const docs = await Transportation.find({});
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Create a new document
router.post('/', async (req, res) => {
  const newData = req.body;
  const newTransportation = new Transportation(newData);
  try {
    const savedDoc = await newTransportation.save();
    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Update an existing document by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedDoc = await Transportation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated document
    );
    if (!updatedDoc) return res.status(404).json({ message: 'Document not found' });
    res.json(updatedDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove a document by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedDoc = await Transportation.findByIdAndDelete(req.params.id);
    if (!deletedDoc) return res.status(404).json({ message: 'Document not found' });
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Test route to verify routing
router.get('/test', (req, res) => {
  console.log("Test route was hit");
  res.json({ message: "Test route working" });
});

module.exports = router;

