const passport = require('passport');

const login = (req, res, next) => {

  // #swagger.tags=['Auth']

  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
};

const logout = async (req, res, next) => {

  // #swagger.tags=['Auth']

  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/documentation');
  });
};

module.exports = {
  login,
  logout
};
