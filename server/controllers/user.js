const User = require("../models").User;

module.exports = {
  list(req, res) {
    return User.findAll()
      .then(messages => res.status(200).send(messages))
      .catch(error => res.status(400).send(error));
  }
};
