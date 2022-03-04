let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
let server = require('../../src/app');
const ReviewRequest = require('../mocks/review.request.mock');

describe('/GET  reviews filter by review source', () => {
    const routeUrl = ReviewRequest.review.reviewRouteUrl;
    ReviewRequest.review.getReview.availableReviewSources.forEach(reviewSource => {
        it('Test should GET list of reviews filter by review source ' + reviewSource, (done) => {
            chai.request(server)
                .get(routeUrl).query({ review_source: reviewSource })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body).should.have.property('docs');
                    const resultLength = res.body.docs.filter(x => x.review_source === reviewSource).length;
                    (resultLength).should.be.eql(res.body.docs.length);
                    done();
                });
        });

    });
});

