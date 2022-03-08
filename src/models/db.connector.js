const mongoose = require('mongoose');

module.exports = {
    openDbConnection: async (url) => await mongoose.connect(url, {
        useNewUrlParser: true
    }),
    closeDbConnection: () => mongoose.disconnect()
  }