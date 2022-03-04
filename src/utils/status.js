// Standard status code map
const StatusCode = {
    api:{
        error:{
            badRequest:{
                code: 400,
                message: 'Bad Request',
                customMessages: []
            },
            unauthorized:{
                code: 401,
                message: 'Unauthorized',
                customMessages: []
            },
            forbidden:{
                code: 403,
                message: 'Forbidden',
                customMessages: []
            },
            notFound:{
                code: 404,
                message: 'Not Found',
                customMessages: []
            },
            internalServerError:{
                code: 500,
                message: 'Internal Server Error',
                customMessages: []
            },

        }
    }
}
module.exports = StatusCode;