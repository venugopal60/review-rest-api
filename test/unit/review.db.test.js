const mongoUnit = require('mongo-unit');
const { expect } = require('chai');
const sortBy = require('lodash/sortBy');
const testData = require('../mocks/review.data.mock');

const ReviewSchema = require('../../src/models/review.schema');
const requestData = require('../mocks/review.request.mock');
const DbConnection = require('../../src/models/db.connector')
const reviewResponseMock = require('../mocks/review.response.mock');

describe('Review Model', () => {

  let connection;
  let ReviewModel;

  before(async () => {
    connection = await DbConnection.openDbConnection(process.env.DATABASE_URL);
    ReviewModel = ReviewSchema.createModel(connection);
  });

  beforeEach(async () => { await mongoUnit.load(testData); });

  afterEach(() => mongoUnit.drop());

  it('Test should get average monthly rating by review source and average rating for 2017-02 should be 2', async () => {

    // return await ReviewModel.Review.paginate({})
    // return await ReviewModel.Review.find({})

    const result = await ReviewModel.aggregate(requestData.monthlyRatings);

    expect(result).to.be.an('array');

    expect(result.length).to.equal(11);

    result.forEach(x => { x.report = sortBy(x.report, ['review_source']); });

    expect(result).to.have.deep.members(reviewResponseMock.averageMonthlyRatingsQueryResults);

  });

});