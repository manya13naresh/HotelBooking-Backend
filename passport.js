const passport = require('passport')
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const user = require('./model/user');
require('dotenv').config();

passport.use('token',new JWTStrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :"password"
},async (jwtPayload,done)=>{
    return await user.findOne({where:{id:jwtPayload.sub}})
                .then(user=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))
passport.use('refresh',new JWTStrategy({
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : "password"
},async (jwtPayload,done)=>{
    return await user.findOne({where:{id:jwtPayload.sub}})
                .then(user=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))