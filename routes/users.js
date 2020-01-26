var express = require('express');
var router = express.Router();

const users = {
  1: {
    punches: [
      {
        type: "in",
        timeStamp: Date.parse('2020-01-25T13:09:00')
      },
      {
        type: "out",
        timeStamp: Date.parse('2020-01-25T14:09:00')
      }
    ]
  }
}

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.json(users[parseInt(req.params.id)]);
});

module.exports = router;
