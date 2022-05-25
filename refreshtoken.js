const jwt= require('jsonwebtoken')
require('dotenv').config()

generateRefreshtoken = user1 => {
    return jwt.sign({
        iss:'manya',
        sub:user1.id,
        iat:Math.floor(Date.now()/1000),
        
    },
    process.env.secret,{
        expiresIn:'1d'
    });
}
module.exports={
    generateRefreshtoken
}