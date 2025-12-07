const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../db/pool");
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM member_information WHERE username = $1", [username]);
            const user = rows[0];

            if(!user) {
                return done(null, false, { message: "Incorrect Username"});
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match) {
                return done(null, false, {message: "Incorrect Password"});
            }
            return done(null, user);
        }
        catch(error) {
            return done(error);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT id, username, first_name, last_name FROM member_information WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    }
    catch(error) {
        done(error);
    }
})

module.exports = passport;