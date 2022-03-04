let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
let server = require('../../src/app');
const ReviewRequest = require('../mocks/review.request.mock');

describe('/GET  reviews filter by rating', () => {
    const routeUrl = ReviewRequest.review.reviewRouteUrl;
    ReviewRequest.review.getReview.allowedRatings.forEach(rating => {
        it('Test should GET list of reviews filter by rating ' + rating, (done) => {
            chai.request(server)
                .get(routeUrl).query({ rating: rating })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body).should.have.property('docs');
                    const resultLength = res.body.docs.filter(x => x.rating === rating).length;
                    (resultLength).should.be.eql(res.body.docs.length);
                    done();
                });
        });

    });

});

