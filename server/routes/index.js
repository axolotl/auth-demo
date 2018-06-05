const messageController = require('../controllers').message;
const userController = require('../controllers').user;

module.exports = (app, passport) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the /api path',
  }));

  // DEV OPTIONS
  app.delete('/api/messages', messageController.destroyAll);
  //

  app.get('/api/users', userController.list);

  app.post('/api/messages', checkAuthentication, messageController.create);
  app.get('/api/messages', checkAuthentication, messageController.list);
  app.delete('/api/messages/:messageId', checkAuthentication, messageController.destroy);

  app.post('/api/register', passport.authenticate('local-signup'), (req, res) => 
    res.status(200).json({ username: req.user.username }));
  app.post('/api/login', passport.authenticate('local-signin'), (req, res) => 
    res.status(200).json({ username: req.user.username }));

  app.post('/api/logout', (req, res) => {
    req.logout();
    res.status(200).send({message: 'OK'});
  });

  app.get('/api/isLoggedIn', checkAuthentication, (req, res) => res.json({ username: req.user.username }) );

};

// strategy for checking logged in status before delivering requested assets
const checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else{
    res.status(401).send({message: 'Unauthorized'});
  }
};