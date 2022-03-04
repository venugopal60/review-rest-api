const StatusCode = require('../utils/status');

const RequestSchema = {

    /**
     * 
     * @param {Object} reqData - request Data query or body
     * @param {Object} req  - API request
     * @param {Object} res - API response object
     * @param {fn} next  - next handler
     * @param {Object} schema - request schema
     */
    validateRequest: (reqData, req, res, next, schema) => {

        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };
        
        const { error, value } = schema.validate(reqData, options);
        
        if (error) {

            const errorObj = StatusCode.api.error.badRequest;
            errorObj.customMessages = error.details.map(x => x.message);
            
            res.status(errorObj.code).send(errorObj);

        } else {            
            next();
        }

    }

};

module.exports = RequestSchema;