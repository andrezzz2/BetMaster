var express = require('express');
var router = express.Router();
const User = require('../models/User');


router.post('/create', function(req, res, next) {

  User.findOrCreate({where: {UID: req.body.UID},
                     defaults: {Email: req.body.Email,
                                PhotoURL: req.body.PhotoURL,
                                Moedas: 100 }}).then(([user, created])=>{
    if(created){
      res.send(user);
    } else {
      res.send("usuário já cadastrado");
    }
  });

});


router.post('/getUser', function(req, res, next) {

  User.findByPk(req.body.UID).then((user=>{
    res.send(user);
  }));

});


router.post('/deleteUser', function(req, res, next) {

  User.destroy({ where: {UID: req.body.UID} }).then((user=>{
    res.send("Usuário excluído");
  }));

});






module.exports = router;
