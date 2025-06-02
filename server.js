require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');

const toursRouter = require('./routes/tours');
const toursRouterCartagena = require('./routes/tourscartagena');
const toursRouterBogota = require('./routes/toursbogota');
const toursRouterEjeCafetero = require('./routes/toursejecafetero');

const transportationRouter = require('./routes/transportation');
const transportationRouterBogota = require('./routes/transportationbogota');
const transportationRouterCartagena = require('./routes/transportationcartagena');
const transportationRouterEjeCafetero = require('./routes/transportationejecafetero');

 const app = express();
 
 // Middleware
 app.use(cors());
 app.use(express.json());
 
 // Connect to MongoDB Atlas
 mongoose.connect(process.env.MONGODB_URI)
   .then(() => {
     console.log('MongoDB connected');
 
 
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
