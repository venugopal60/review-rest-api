let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
let server = require('../../src/app');
const ReviewRequest = require('../mocks/review.request.mock');

describe('/POST add review', () => {
    
    const routeUrl = ReviewRequest.review.reviewRouteUrl;

    it('it should Add Review', (done) => {
        chai.request(server)
            .post(routeUrl)
            .send(ReviewRequest.review.addReview.data)
            .end((err, res) => {
                (res).should.have.status(201);
                (res.body).should.have.property('_id');
                done();
            });
    });

    it('it should GET status 400 Bad Request for invalid rating', (done) => {
        chai.request(server)
            .post(routeUrl)
            .send(ReviewRequest.review.addReview.invalidRatingData)
            .end((err, res) => {

                (res).should.have.status(400);

                (res.body.customMessages[0]).should.be.eql(ReviewRequest.review.errorMessages.invalidRating);

                done();
            });
    });

    it('it should GET status 400 Bad Request for missing required review source', (done) => {
        chai.request(server)
            .post(routeUrl)
            .send(ReviewRequest.review.addReview.missingRequired)
            .end((err, res) => {

                (res).should.have.status(400);

                (res.body.customMessages[0]).should.be.eql(ReviewRequest.review.errorMessages.missingReviewSource);

                done();
            });
    });
});


