let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
let server = require('../../src/app');
const ReviewRequest = require('../mocks/review.request.mock');


describe('/GET verage monthly ratings per store', () => {
    const routeUrl = ReviewRequest.review.monthlyReportsRoute;
    it('it should get average monthly ratings per store', (done) => {
        chai.request(server)
            .get(routeUrl)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('array');
                (res.body[0]).should.have.property('review_month');
                (res.body[0]).should.have.property('report');
                done();
            });
    });
});
