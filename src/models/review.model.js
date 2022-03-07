const ReviewSchema = require('./review.schema');

const ReviewModel = {

    saveReview: async (reviewObj) => {
        try {
            const NewReview = new ReviewSchema.Review(reviewObj);
            return await NewReview.save();    
        } catch (error) {
            throw error;
        }
        
    },

    getReview: async (query, pageOptions) => {
        try {
            return await ReviewSchema.Review.paginate(query, pageOptions);    
        } catch (error) {
            throw error;
        }
        
    },
    
    getReviewAggregation: async(query)=>{
        try {
            return await ReviewSchema.Review.aggregate(query);    
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = ReviewModel;
