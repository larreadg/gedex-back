const expressJwt = require('express-jwt');


jwt = () => {
    const secret = process.env.SECRET;
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/login'
        ]
    });
}

module.exports = jwt;