var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.locals.title = "BetMaster API";
  res.render('index');
});


module.exports = router;
