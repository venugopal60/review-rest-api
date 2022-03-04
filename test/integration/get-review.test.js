let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
let server = require('../../src/app');
const ReviewRequest = require('../mocks/review.request.mock');
const routeUrl = ReviewRequest.review.reviewRouteUrl;


describe('/GET reviews', () => {
    it('it should GET list of reviews', (done) => {
        chai.request(server)
            .get(routeUrl)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('docs');
                (res.body.docs.length).should.be.eql(50);
                done();
            });
    });
    

    it('it should GET list of reviews filter by rating 5 with pagination with page 2', (done) => {
        chai.request(server)
            .get(routeUrl)
            .query(ReviewRequest.review.getReview.queryByRatingWithPagination)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('docs');
                (res.body.page).should.be.eql(ReviewRequest.review.getReview.queryByRatingWithPagination.page);
                const resultLength = res.body.docs.filter(x => x.rating === ReviewRequest.review.getReview.queryByRatingWithPagination.rating).length;
                (resultLength).should.be.eql(res.body.docs.length);
                done();
            });
    });

    it('it should GET list of review filter by store', (done) => {
        chai.request(server)
            .get(routeUrl).query(ReviewRequest.review.getReview.queryByStore)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('docs');
                const resultLength = res.body.docs.filter(x => x.review_source === ReviewRequest.review.getReview.queryByStore.review_source).length;
                (resultLength).should.be.eql(res.body.docs.length);
                done();
            });
    });

    it('it should GET list of review filter by review date', (done) => {
        chai.request(server)
            .get(routeUrl).query(ReviewRequest.review.getReview.queryByReviewDate)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('docs');
                done();
            });
    });

    it('it should GET list of review filter by rating and store', (done) => {
        chai.request(server)
            .get(routeUrl)
            .query(ReviewRequest.review.getReview.queryByRatingAndStore)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('docs');
                const resultLength = res.body.docs.filter(x => x.rating === ReviewRequest.review.getReview.queryByRatingAndStore.rating
                    && x.review_source === ReviewRequest.review.getReview.queryByRatingAndStore.review_source).length;
                (resultLength).should.be.eql(res.body.docs.length);
                done();
            });
    });

    it('it should GET list of review filter by rating, store and review date ', (done) => {
        chai.request(server)
            .get(routeUrl)
            .query(ReviewRequest.review.getReview.queryByReviewDateAndRatingAndStore)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('docs');
                done();
            });
    });

    it('it should GET status 400 Bad Request for invalid  rating ', (done) => {
        chai.request(server)
            .get(routeUrl).query(ReviewRequest.review.getReview.invalidRatingQuery)
            .end((err, res) => {
                (res).should.have.status(400);
                done();
            });
    });

    it('it should GET status 200 with empty docs ', (done) => {
        chai.request(server)
            .get(routeUrl).query(ReviewRequest.review.getReview.emptyResultsQuery)
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('docs');
                (res.body.docs.length).should.be.eql(0);
                done();
            });
    });
});

