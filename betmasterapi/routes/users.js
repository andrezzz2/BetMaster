var express = require('express');
var router = express.Router();
const User = require('../models/User');


router.post('/create', function(req, res, next) {

  User.findOrCreate({where: {UID: req.body.UID},
                     defaults: {Email: req.body.Email,
                                PhotoURL: req.body.PhotoURL,
                                Moedas: 100 }}).then(([user, created])=>{
    if(created){
      res.send({accepted: true, log: "Novo usuário cadastrado."});
    } else {
      res.send({accepted: false, error: "usuário já cadastrado"});
    }
  }).catch(error=>{
      console.error(error);
      res.send({accepted: false, error: "Falha no sistem ao tentar criar novo usuário"});
  });

});


router.post('/getUser', function(req, res, next) {

  User.findByPk(req.body.UID).then((user=>{
    if(user){
      res.send({accepted: true, user: user});
    } else {
      res.send({accepted: false, error: "Usuário não encontrado"});
    }
  })).catch(error=>{
    console.error(error);
    res.send({accepted: false, error: "Erro no sistema ao buscar usuário"});
  });

});


router.post('/deleteUser', function(req, res, next) {

  User.destroy({ where: {UID: req.body.UID} }).then((user=>{
    res.send("Usuário excluído");
  }));

});






module.exports = router;
