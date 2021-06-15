const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

module.exports = function setup() {
  passport.use(
    'local',
    new LocalStrategy((username, password, done) => {
      let adminUser = {
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASSWORD,
      };

      let triedLogin = { username, password };

      let areTheSame = JSON.stringify(adminUser) === JSON.stringify(triedLogin);

      if (areTheSame) {
        done(null, { username });
      } else {
        done(null, false);
      }
    })
  );
};
