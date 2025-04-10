const mongoose = require("mongoose");

const precioPorPaxSchema = new mongoose.Schema({
  minPax: { type: Number, required: true },
  maxPax: { type: Number, required: true },
  pricePax: { type: Number, required: true } // Stored in USD
});

const costoPorCarroSchema = new mongoose.Schema({
  minPax: { type: Number, required: true },
  maxPax: { type: Number, required: true },
  priceCar: { type: Number, required: true } // Stored in COP
});

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  internoCop: { type: Number, required: true },
  ventaUsd: { type: Number, required: true },
  precioPorPax: [precioPorPaxSchema],
  costoPorCarro: [costoPorCarroSchema]
});

module.exports = mongoose.model("TourBogota", tourSchema);
