const ReviewSchema = require('./review.schema');


const ReviewModel = {
    getModel:()=>{

    },
    saveReview: async (reviewObj) => {
        try {
            const NewReview = new ReviewSchema.ReviewModel(reviewObj);
            return await NewReview.save();    
        } catch (error) {
            throw error;
        }
        
    },

    getReview: async (query, pageOptions) => {
        try {
            return await ReviewSchema.ReviewModel.paginate(query, pageOptions);    
        } catch (error) {
            throw error;
        }
        
    },
    
    getReviewAggregation: async(query)=>{
        try {
            return await ReviewSchema.ReviewModel.aggregate(query);    
        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = ReviewModel;
