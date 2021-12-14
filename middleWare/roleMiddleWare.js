const jwt = require('jsonwebtoken');

module.exports = (roles) => {
    return function(req,res,next){
        if(req.method === 'OPTIONS'){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                console.log("User is not authorized");
                return res.status(403).json({message:"User is not authorized"});
            }
            const {roles:userRoles} = jwt.verify(token,process.env.JWTsecret);
            let hasRole = false;
            userRoles.forEach(role => {
                if(roles.includes(role))
                    hasRole = true;
            });
            if(!hasRole){
                console.log("You don't have access");
                return res.status(403).json({message:"You don't have access"});
            }
            next();
        }catch(e){
            console.log("User is not authorized",e);
            return res.status(403).json({message:"User is not authorized"});
        }
    }
}