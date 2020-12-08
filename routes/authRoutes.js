const passport = require('passport');//original npm passport module

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google')); //code will be included in the url

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
