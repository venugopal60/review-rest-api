// Query to get monthly average rating for each review_source
module.exports = [

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