const ReviewRequest = {
    review: {
        reviewRouteUrl: '/v1/review',
        monthlyReportsRoute: '/v1/monthly-ratings',
        totalStoreRatingsRoute: '/v1/total-store-ratings',
        getReview: {
            allowedRatings: [1, 2, 3, 4, 5],
            availableReviewSources: ['iTunes', 'GooglePlayStore'],
            queryByRating: { rating: 5 },
            queryByStore: { review_source: 'iTunes' },
            queryByRatingAndStore: { rating: 5, review_source: 'iTunes' },
            queryByRatingWithPagination: { rating: 5, page: 2 },
            queryByReviewDate: { reviewed_date: '2018-02-25' },
            queryByReviewDateAndRatingAndStore: { reviewed_date: '2018-02-25', rating: 2, review_source: 'GooglePlayStore' },
            invalidRatingQuery: { rating: 6 },
            emptyResultsQuery: { review_source: 'abc' },
        },
        addReview: {
            data: {
                review: 'I like it',
                author: 'Venugopal',
                review_source: 'GooglePlayStore',
                rating: 5,
                title: 'Awsome',
                product_name: 'Amazon Alexa',
            },
            invalidRatingData: {
                review: 'I like it',
                author: 'Venugopal',
                review_source: 'GooglePlayStore',
                rating: 7,
                title: 'Awsome',
                product_name: 'Amazon Alexa',
            },
            missingRequired: {
                review: 'I like it',
                author: 'Venugopal',
                rating: 1,
                product_name: 'Amazon Alexa',
            }
        },
        errorMessages: {
            invalidRating: '"rating" must be one of [1, 2, 3, 4, 5]',
            missingReviewSource: '"review_source" is required',
            invalidReportQuery: '"group" must be one of [month, review_source]'
        }
    },
    // Query to get total rating by review_source
    totalStoreRatingsQuery: [
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

    ],
    // Query to get monthly average rating for each review_source
    monthlyRatings: [

        {
            $group: {
                _id: { year: { $year: '$reviewed_date' }, month: { $month: '$reviewed_date' }, review_source: '$review_source' },
                average_rating: { $avg: '$rating' },
                reviewed_date: { $last: '$reviewed_date' },

            }
        },

        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$reviewed_date' } },
                report: {
                    $push: {
                        review_source: '$_id.review_source',
                        average_rating: {
                            $divide: [{
                                $trunc: {
                                    $multiply: ['$average_rating', 100]
                                }
                            }, 100]
                        }
                    }
                },
            }
        },

        { $sort: { _id: -1 } },

        {
            $project: {
                _id: 0,
                review_month: '$_id',
                report: '$report'
            }
        }

    ]



}

module.exports = ReviewRequest;