const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const cors = require('cors');
const DbConnection = require('../src/models/db.connector');
const ReviewSchema = require('../src/models/review.schema');

const AppConfig = require('./config/app.config.local');

const ReviewRoute = require('./routes/review.route');
const AverageMonthlyRatingsBystore = require('./routes/average-monthly-ratings.route');
const TotalStoreRatings = require('./routes/total-store-ratings.route');




app.use(bodyParser.json());

// allow cross origin request
app.use(cors()); 

const connectDb = async()=>{
  const connection = await DbConnection.openDbConnection(AppConfig.db.mongoUrl);
  ReviewSchema.ReviewModel = ReviewSchema.createModel(connection);  
  
}
connectDb();

// API routes
app.use('/v1/review', ReviewRoute);
app.use('/v1/monthly-ratings', AverageMonthlyRatingsBystore);
app.use('/v1/total-store-ratings', TotalStoreRatings);

// Uncaught error handler
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err)
    process.exit(1);
  })



app.listen(AppConfig.server.port || 3000, ()=>{
    console.log('server started');   
});



module.exports = app;