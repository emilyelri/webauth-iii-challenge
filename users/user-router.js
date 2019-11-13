const router = require('express').Router();
const db = require('./user-model');
const restricted = require('../auth/restricted');

router.get('/', restricted, (req, res) => {
  const dept = req.decodedJwt.department;
  console.log(dept)
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;