require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');

const toursRouter = require('./routes/tours');
const toursRouterCartagena = require('./routes/tourscartagena');
const toursRouterBogota = require('./routes/toursbogota');
const toursRouterEjeCafetero = require('./routes/toursejecafetero');

const transportationRouter = require('./routes/transportation');
const transportationRouterBogota = require('./routes/transportationcartagena');
const transportationRouterCartagena = require('./routes/transportationbogota');
const transportationRouterEjeCafetero = require('./routes/transportationejecafetero');


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
 app.use('/api/toursbogota', toursRouterBogota);
 app.use('/api/tourscartagena', toursRouterCartagena);
 app.use('/api/toursejecafetero', toursRouterEjeCafetero);

 app.use('/api/transportation', transportationRouter);
 app.use('/api/transportationbogota', transportationRouterBogota);
 app.use('/api/transportationcartagena', transportationRouterCartagena);
 app.use('/api/transportationejecafetero', transportationRouterEjeCafetero);


 // Start the server
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });
