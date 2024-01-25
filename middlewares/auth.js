const jwt = require('jsonwebtoken');
require('dotenv').config()


const middleware = (req, res, next) => {
    
    try{
        const token=req.header('Authorization');
        if(!token){
            return res.status(401).json({message:"Unauthorized.No toke provided"});
    
        }
    // console.log(token);
    const tokenWithoutBearer = token ? token.split(' ')[1] : null;

    const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
    // console.log(decoded);
        req.user=decoded;
        next();

    }
    catch(error){
        console.log(error);
        return res.status(401).json({message:"Unauthorized.Token is not valid"});

    }
};

module.exports = middleware;
