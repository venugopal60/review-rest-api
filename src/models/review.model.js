const Review = require('./review.schema');

const ReviewModel = {

    saveReview: async (reviewObj) => {
        try {
            const NewReview = new Review(reviewObj);
            return await NewReview.save();    
        } catch (error) {
            throw error;
        }
        
    },

    getReview: async (query, pageOptions) => {
        try {
            return await Review.paginate(query, pageOptions);    
        } catch (error) {
            throw error;
        }
        
    },
    
    getReviewAggregation: async(query)=>{
        try {
            return await Review.aggregate(query);    
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = ReviewModel;
