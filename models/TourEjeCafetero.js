// models/TourEjeCafetero.js
const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  internoCop: { type: Number, required: true },
  ventaUsd: { type: Number, required: true }
});

module.exports = mongoose.model('TourEjeCafetero', TourSchema);
