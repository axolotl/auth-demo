const messageController = require('../controllers').message;
const userController = require('../controllers').user;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the /api path',
  }));

  app.post('/api/messages', messageController.create);
  app.get('/api/messages', messageController.list);
  app.delete('/api/messages/:messageId', messageController.destroy);

  app.post('/api/user', userController.create);

};