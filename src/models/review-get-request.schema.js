const Joi = require('joi');
const RequestSchema = require('../utils/request.validate');

const GetReviewSchema = {
    getReview: (req, res, next) => {
        
        const schema = Joi.object({
            page: Joi.number(),
            rating: Joi.number().valid(1, 2, 3, 4, 5),
            reviewed_date: Joi.date(),
            review_source: Joi.string()
        });
        
        RequestSchema.validateRequest(req.query, req, res, next, schema);
    }
};
module.exports = GetReviewSchema;