const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            console.log("User is not authorized",e);
            return res.status(403).json({message:"User is not authorized"});
        }
        const decodedData = jwt.verify(token,process.env.JWTsecret);
        req.user = decodedData;
        next();
    }catch(e){
        console.log("User is not authorized",e);
        return res.status(403).json({message:"User is not authorized"});
    }
}