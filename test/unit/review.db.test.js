const { expect } = require('chai');
const mongoUnit = require('mongo-unit');
const testData = require('../mocks/review.mock.data');
const DbSchema = require('../../src/models/review.schema');
const requestData = require('../mocks/review.request.mock');


describe('Review Model', () => {

  before(async () => { await DbSchema.openDbConnection(process.env.DATABASE_URL); })
  beforeEach(async () => { await mongoUnit.load(testData); })
  afterEach(() => mongoUnit.drop())

  it('Test should get average monthly rating by review source and average rating for 2017-02 should be 2', async () => {
    // return await reviewUT.Review.paginate({})
    // return await reviewUT.Review.find({})
    return await DbSchema.Review.aggregate(requestData.monthlyRatings)
      .then(async result => {

        expect(result.length).to.equal(11);
        expect(result[0].review_month).to.equal('2020-01');

        expect(result[10].review_month).to.equal('2017-05');
        expect(result[10].report[0].review_source).to.equal('GooglePlayStore');
        expect(result[10].report[0].average_rating).to.equal(2);
      })
  })

})