// models/TransportationCartagena.js
const mongoose = require('mongoose');

const TransportationSchema = new mongoose.Schema({
  type: { type: String, default: "transportationPricingCartagena" },
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

module.exports = mongoose.model('TransportationCartagena', TransportationSchema);
