const jwt= require('jsonwebtoken')
require('dotenv').config()

generateJwt = user1 => {
    return jwt.sign({
        iss:'manya',
        sub:user1.id,
        iat:Math.floor(Date.now()/1000),
        
    },
    process.env.secret,{
        expiresIn:'5m'
    });
}
module.exports={
    generateJwt
}