const AppConfig = require('../../../config/app.config.local');
const ToalRatingsByStoreQuery = require('./aggregate/total-store-ratings');
const AverageMonthlyRatingsByStoreQuery = require('../query/aggregate/monthly-store-ratings');

const ReviewsQuery = {
    allowedFilters: ['rating','review_source'],

    /**
     * 
     * @param {Date} date 
     * @returns object date range
     */
    getDayQuery: (date) => {

        try {

            const startTime = new Date(date);
            startTime.setSeconds(0);
            startTime.setHours(0);
            startTime.setMinutes(0);

            const endTime = new Date(startTime);
            endTime.setHours(23);
            endTime.setMinutes(59);
            endTime.setSeconds(59);
            
            return { $gt: startTime, $lt: endTime };

        } catch (error) {
            throw error;
        }

    },

    /**
     * 
     * @param {Object} req - API request object
     * @returns query Object
     */
    getReviewsQuery: (req) => {

        const query = {};
        ReviewsQuery.allowedFilters.forEach(x=>{
            if(req.query[x]){
                query[x] = req.query[x];
            }            
        });        

        if (req.query.reviewed_date) {
            try {
                query.reviewed_date = ReviewsQuery.getDayQuery(req.query.reviewed_date)
            } catch (error) {
                throw error;
            }
        }


        return query;

    },

    /**
     * 
     * @param {Object} req - API request object
     * @returns object with pagination options
     */
    getPaginationOptions: (req) => {

        const options = AppConfig.db.paginateOptions || {};
        options.page = req.query.page || 1;
        return options;

    },

    averageMonthlyRatingsByStoreQuery: AverageMonthlyRatingsByStoreQuery,

    toalRatingsByStoreQuery: ToalRatingsByStoreQuery,
}
module.exports = ReviewsQuery;