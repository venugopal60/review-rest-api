const mongoUnit = require('mongo-unit')

mongoUnit.start().then(() => {
  process.env.DATABASE_URL = mongoUnit.getUrl(); // this var process.env.DATABASE_URL = will keep link to fake mongo
  run() // this line start mocha tests
})

after(() => {
  const reviewSchema = require('../../src/models/review.schema')
  console.log('stop')
  reviewSchema.closeDbConnection();
  return mongoUnit.stop();
})