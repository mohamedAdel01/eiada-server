const jwt = require('jsonwebtoken');

const checkToken = token => {
    return jwt.verify(token, 'secret', (err, decoded) => {
        if(err) 
            return {
            errors: [{
                key: 'Unautherized',
                message: 'Your session is expired, Please login again'
            }]
        }
    
        return {
            user: decoded.data,
            errors: []
        }
      });
}

module.exports = {
    checkToken
}