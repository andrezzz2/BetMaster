var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const { Op } = require('sequelize');           



router.post('/createRoom', function(req, res, next) {
  Room.findOrCreate({where:{Name: req.body.Name}}).then(([room, created])=>{
    if(created){
        res.send("sala criada com sucesso");
    }else {
      res.send("sala já existente");
    }
  });
});

router.get('/getRooms', function(req, res, next) {

  Room.findAll().then((rooms)=>{
    res.send(rooms);
  });

});

router.post('/getRooms', function(req, res, next) {

  //ver se Name contem o req.body.Name
  Room.findAll({where: {Name: { [Op.substring]: "%"+req.body.Name+"%" } }}).then((rooms)=>{
    res.send(rooms);
  });

});

/*
router.post('/joinRoom', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/findRoom', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/deleteRoom', function(req, res, next) {
  res.send('respond with a resource');
});

*/

module.exports = router;
