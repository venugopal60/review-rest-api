const express = require('express');
const router = express.Router();

const AddReviewSchema = require('../models/review-add-request.schema');
const GetReviewSchema = require('../models/review-get-request.schema');

const StatusCode = require('../utils/status');
const ReviewController = require('../controllers/review.controller');
const ReviewModel = require('../models/review.model');


router.post('/', AddReviewSchema.addReview, async (req, res, next) => {
    try {
        const result = await ReviewModel.saveReview(req.body)
        res.status(201).send(result);
    } catch (error) {
        const errorObj = StatusCode.api.error.internalServerError;
        errorObj.customMessages = [error.message];
        res.status(errorObj.code).send(errorObj);
    }
});

router.get('/', GetReviewSchema.getReview, async (req, res, next) => {
    try {
        const result = await ReviewController.getReviews(req);
        res.status(200).send(result);

    } catch (error) {
        const errorObj = StatusCode.api.error.internalServerError;
        errorObj.customMessages = [error.message];
        res.status(errorObj.code).send(errorObj);
    }
});

module.exports = router;