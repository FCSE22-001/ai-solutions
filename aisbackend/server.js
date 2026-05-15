const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Poiii, this is for the middleware
app.use(cors());
app.use(express.json());

//Poiii, this is for the routes
const inquiriesRoute = require('./routes/inquiries');
const reviewsRoute = require('./routes/reviews');
const promotionalRoute = require('./routes/promotional');
const upcomingRoute = require('./routes/upcoming');
const adminRoute = require('./routes/admin');
const solutionsRoute = require('./routes/solutions');

app.use('/api/inquiries', inquiriesRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/promotional', promotionalRoute);
app.use('/api/upcoming', upcomingRoute);
app.use('/api/admin', adminRoute);
app.use('/api/solutions', solutionsRoute);

//Poiii, this is the server launch bit
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server Running On Port ${PORT}');
});