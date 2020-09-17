const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');

const { User } = require('./models');

const { JWT_KEY } = process.env;

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_KEY
    },
    async (payload, done) => {
        try {
            const user = User.findOne(payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            done(err, false);
        }
    })
)