const passport = require('passport');
const users = require('../models/User');
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;

require('dotenv').config();
const secret = process.env.SECRET_KEY;


passport.use(
    new JWTStrategy({
        secretOrKey : secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null,token.user);
        } catch (err) {
            done(err);
        }
    }
    )
);

passport.use('register' , new LocalStrategy({
    usernameField : 'name',
    passwordField: 'password'
},
    async (name, password, done)=>{
        try {
            users.findOne({name}, (err,result) =>{
                result ? done (null, {message: "User is already exist!"}) : users.create({name,password}); done (null, {message: "Successful"});
            })
        } catch (err) {
            done(err);
        }
    }
));

passport.use('login', new LocalStrategy({
    usernameField : 'name',
    passwordField : 'password'
},
    async (name,password,done)=> {
        try {
            users.findOne({name}, (err,result) => {
                if (err) throw error(err);
                !result ? done(null, {message: "User doesn't Exist!"}) : users.findOne({name} , (err,res) => {
                    if (err) throw err;
                    !res ? done(null,{message: "You entered wrong password"}) : done(null,{message: "Login successfully!"});
                })
            })
        } catch (error) {
            done(error);
        }
    }
));