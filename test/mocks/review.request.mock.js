const ReviewRequest = {
    review: {
        reviewRouteUrl: '/v1/review',
        monthlyReportsRoute: '/v1/monthly-ratings',
        totalStoreRatingsRoute:'/v1/total-store-ratings',
        getReview: {
            allowedRatings: [1,2,3,4,5],
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
    }
}

module.exports = ReviewRequest;