const bcrypt = require('bcryptjs');
const db = require('../users/user-model.js');

module.exports = (req, res, next) => {
  const { username, password } = req.headers;

  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Server Error: Unable to authorize user.' });
      });
  } else {
    res.status(400).json({ message: 'No credentials provided.' });
  }
};