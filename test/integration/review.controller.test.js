const ReviewController = require("../../src/controllers/review.controller");
const ReviewModel = require("../../src/models/review.model");
let chai = require('chai');
const should = chai.should();
const ReviewRequest = require('../mocks/review.request.mock');

describe('Review Controller', () => {
    it('Should Get reviews', async () => {
        //totalStoreRatingsQuery
        // ReviewRequest.totalStoreRatingsQuery
        const res = await ReviewController.getReviews({query:{}});
        
        (res).should.be.an('object');
        (res).should.have.property('docs');
        (res.docs.length).should.eql(50);
    });
});