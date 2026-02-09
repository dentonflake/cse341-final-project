const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const host = process.env.HOST || 'http://localhost:3000';

if (!clientID || !clientSecret) {
  console.warn('GitHub OAuth is not configured. Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET.');
} else {
  passport.use(
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: `${host}/auth/github/callback`
      },
      (accessToken, refreshToken, profile, done) => done(null, profile)
    )
  );
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = passport;
