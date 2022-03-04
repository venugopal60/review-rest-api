const ReviewController = require("../../src/controllers/review.controller");
let chai = require('chai');
const should = chai.should();

describe('Review Controller', () => {
    it('Should Get reviews', async () => {
        const res = await ReviewController.getReviews({ query: {} });
        (res).should.be.an('object');
        (res).should.have.property('docs');
        (res.docs.length).should.eql(50);
    });
});