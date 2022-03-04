const Joi = require('joi');
const RequestSchema = require('../utils/request.validate');

const AddReviewSchema = {
    
    addReview: (req, res, next) => {
        
        const schema = Joi.object({
            author: Joi.string(),
            product_name: Joi.string().required(),
            review: Joi.string().required(),
            review_source: Joi.string().required(),
            rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
            title: Joi.string()
        });

        RequestSchema.validateRequest(req.body, req, res, next, schema);
    }
};

module.exports = AddReviewSchema;