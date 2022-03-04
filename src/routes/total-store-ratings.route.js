const express = require('express');
const router = express.Router();

const StatusCode = require('../utils/status');
const ReviewController = require('../controllers/review.controller');

router.get('/'  , async (req, res, next) => {
    try {
        const result = await ReviewController.getTotalRatingsByStore(req);
        res.status(200).send(result);
    } catch (error) {
        const errorObj = StatusCode.api.error.internalServerError;
        errorObj.customMessages = [error.message];
        res.status(errorObj.code).send(errorObj);
    }
});


module.exports = router;