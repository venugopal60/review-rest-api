// app configurations
module.exports = {
    server: { port: 9090 },
    db: {
        mongoUrl: 'mongodb://localhost:27017/review',
        collectionName: 'review',
        paginateOptions: {
            limit: 50,
        }
    }
};;