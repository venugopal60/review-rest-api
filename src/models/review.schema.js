const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const AppConfig = require('../config/app.config.local');


const openDbConnection = async () => {
    const dbStatus = mongoose.connection.readyState;
    if (dbStatus === 0 || dbStatus === 3) {
        await mongoose.connect(AppConfig.db.mongoUrl);
    }
}

openDbConnection();

const closeDbConnection = () => {
    mongoose.connection.close();
}

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    author: String,
    product_name: String,
    rating: {
        type: Number, required: true, validate() {
            return this.rating && this.rating <= 5 && this.rating > 0
        }
    },
    review: { type: String, required: true },
    reviewed_date: { type: Date, default: Date.now, required: true },
    review_source: { type: String, required: true },
    title: { type: String, required: false, default: '' },
});

ReviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model(AppConfig.db.collectionName, ReviewSchema, AppConfig.db.collectionName);

module.exports = Review;
