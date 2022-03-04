let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
let server = require('../../src/app');
const ReviewRequest = require('../mocks/review.request.mock');


describe('/GET  total ratings for each category', () => {
    const routeUrl = ReviewRequest.review.totalStoreRatingsRoute;    
    it('it should get total ratings for each category', (done) => {
        chai.request(server)
            .get(routeUrl)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('array');
                (res.body[0]).should.have.property('review_source');
                (res.body[0]).should.have.property('ratings');
                done();
            });
    });

});
