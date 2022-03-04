// Query to get total rating by review_source
module.exports = [
        // ([['review_source', 1], ['rating', -1]]) },
    {
        $group: {
            _id: { rating: '$rating', review_source: '$review_source' },
            total_ratings: { $sum: 1 }
        }
    },

    {
        $group: {
            _id: '$_id.review_source',

            report: {
                $push: {
                    rating: '$_id.rating', total_ratings: '$total_ratings',
                }
            },
        },

    },
    {
        $project: {
            _id: 0,
            review_source: '$_id',
            ratings: '$report'
        }
    }

];


