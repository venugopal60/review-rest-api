const mongoUnit = require('mongo-unit');
const { expect } = require('chai');
const sortBy = require('lodash/sortBy');
const DbConnection = require('../../src/models/db.connector');
const testData = require('../mocks/review.data.mock');
const ReviewSchema = require('../../src/models/review.schema');
const requestData = require('../mocks/review.request.mock');



describe('Review Model', () => {
  let connection;
  let ReviewModel;

  before(async () => {
    connection = await DbConnection.openDbConnection(process.env.DATABASE_URL);
    ReviewModel = ReviewSchema.createModel(connection);
  })

  beforeEach(async () => { await mongoUnit.load(testData); })
  
  afterEach(() => mongoUnit.drop())

  it('Test should get average monthly rating by review source and average rating for 2017-02 should be 2', async () => {
  
    // return await ReviewModel.Review.paginate({})
    // return await ReviewModel.Review.find({})
  
    const result = await ReviewModel.aggregate(requestData.monthlyRatings);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(11);
    const expectedResult = [{ "review_month": "2020-01", "report": [{ "review_source": "iTunes", "average_rating": 4 }] }, { "review_month": "2018-02", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.98 }, { "review_source": "iTunes", "average_rating": 1.73 }] }, { "review_month": "2018-01", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.93 }, { "review_source": "iTunes", "average_rating": 1.76 }] }, { "review_month": "2017-12", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.86 }, { "review_source": "iTunes", "average_rating": 1.7 }] }, { "review_month": "2017-11", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.56 }] }, { "review_month": "2017-10", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.84 }] }, { "review_month": "2017-09", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.64 }] }, { "review_month": "2017-08", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.91 }] }, { "review_month": "2017-07", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.55 }] }, { "review_month": "2017-06", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2.37 }] }, { "review_month": "2017-05", "report": [{ "review_source": "GooglePlayStore", "average_rating": 2 }] }];
    
    result.forEach(x => {
      x.report = sortBy(x.report, ['review_source']);
    });

    expect(result).to.have.deep.members(expectedResult);   
    
  });

});