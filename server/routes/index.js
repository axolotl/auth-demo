const messageController = require('../controllers').message;
const userController = require('../controllers').user;

module.exports = (app, passport) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the /api path',
  }));

  // list users, for dev only
  app.get('/api/users', userController.list);

  app.post('/api/messages', checkAuthentication, messageController.create);
  app.get('/api/messages', checkAuthentication, messageController.list);
  app.delete('/api/messages/:messageId', checkAuthentication, messageController.destroy);

  app.post('/api/register', passport.authenticate('local-signup', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
    }
  ));

  app.post('/api/login', passport.authenticate('local-signin', {
      successRedirect: '/dashboard',
      failureRedirect: '/'
    }
  ));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};

// strategy for checking logged in status before delivering requested assets
const checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else{
    res.redirect("/login");
  }
};