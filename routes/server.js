require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const toursRouter = require('./routes/tours');
const transportationRouter = require('./routes/transportation');
const Transportation = require('./models/Transportation'); // for the direct test query

// Log the registered routes for debugging
console.log("Registered routes:", transportationRouter.stack);

const app = express();

// Log the connection string (mask the password if needed)
console.log("Using connection string:", process.env.MONGODB_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');

    // Direct test query: try to fetch any document from the "transportations" collection
    Transportation.findOne({})
      .then(doc => {
        console.log("Direct test query result:", doc);
      })
      .catch(err => {
        console.error("Error during direct test query:", err);
      });
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tours', toursRouter);
app.use('/api/transportation', transportationRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
