const ReviewModel = require('../models/review.model');
const ReviewsQuery = require('../utils/db/query/get-reviews');

const ReviewController = {

    getReviews: async (req) => {
        try {
            return ReviewModel.getReview(ReviewsQuery.getReviewsQuery(req), ReviewsQuery.getPaginationOptions(req));
        } catch (error) {
            throw error;
        }
    },

    getAverageMonthlyRatingsByStore: async () => {
        try {
            return await ReviewModel.getReviewAggregation(ReviewsQuery.averageMonthlyRatingsByStoreQuery);    
        } catch (error) {
            throw error;
        }
        
    },

    getTotalRatingsByStore: async() => {
        try {
            return await ReviewModel.getReviewAggregation(ReviewsQuery.toalRatingsByStoreQuery);    
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = ReviewController;