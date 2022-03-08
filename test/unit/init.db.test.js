const mongoUnit = require('mongo-unit')

mongoUnit.start().then(() => {
  process.env.DATABASE_URL = mongoUnit.getUrl(); // this var process.env.DATABASE_URL = will keep link to fake mongo
  run() // this line start mocha tests
})

after(() => {
  const dbConnection = require('../../src/models/db.connector');
  console.log('stop');
  dbConnection.closeDbConnection();
  return mongoUnit.stop();
})