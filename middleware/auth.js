const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    // get token from header
    const token = req.header('x-auth-token');
    // if no token present send msg
    if(!token){
       res.status(401).json({msg: 'Authorisation denied'});
    }
    else{
        try {
            const decoded = jwt.verify(token,config.get('jwtSecret'));
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401).json({msg: 'Token no Valid'});
        }

      
    }
    
}