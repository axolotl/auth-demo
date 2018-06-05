const Message = require('../models').Message;

module.exports = {
  create(req, res) {
    return Message
      .create({
        username: req.user.username,
        message: req.body.message,
      })
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Message
      .findAll({ where: { username: req.user.username } })
      .then((messages) => res.status(200).send(messages))
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Message
      .findById(req.params.messageId)
      .then(message => {
        if (!message) {
          return res.status(400).send({
            message: 'Message Not Found',
          });
        }
        return message
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroyAll(req, res) {
    return Message
      .findAll()
      .then(messages => messages.map(message => {
        return message
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      }))
      .catch((error) => res.status(400).send(error));
      
  },
};