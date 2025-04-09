// models/TransportationBogota.js
const mongoose = require('mongoose');

const TransportationSchema = new mongoose.Schema({
  type: { type: String, default: "transportationPricingBogota" },
  saleByPerson: [
    {
      minPax: Number,
      maxPax: Number,
      priceEach: Number
    }
  ],
  costByCar: [
    {
      minPax: Number,
      maxPax: Number,
      priceCar: Number
    }
  ]
});

module.exports = mongoose.model('TransportationBogota', TransportationSchema);
