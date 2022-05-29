var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const { Op } = require('sequelize');           



router.post('/createRoom', function(req, res, next) {
  console.log("tentando criar sala");
  Room.findOrCreate({where:{Name: req.body.Name},
                     defaults:{GameId: req.body.GameId} }).then(([room, created])=>{
    if(created){
        res.send("sala criada com sucesso");
    }else {
      res.send("sala já existente");
    }
  });
});

router.post('/getAllRooms', function(req, res, next) {

  Room.findAll({where: {GameId: req.body.GameId }}).then((rooms)=>{
    res.send(rooms);
  });

});

router.post('/getRooms', function(req, res, next) {

  //ver se Name contem o req.body.Name
  Room.findAll({where: {Name: { [Op.substring]: "%"+req.body.Name+"%" }, GameId: req.body.GameId}}).then((rooms)=>{
    res.send(rooms);
  });

});


router.post('/joinRoom', function(req, res, next) {
    Room.findAll({where:{Name: req.body.Name,
                         GameId: req.body.GameId}}).then(rooms=>{

      if (!(rooms[0].Player1)){
        rooms[0].Player1 = req.body.Player;
        console.log(rooms[0].Player1);
        rooms[0].save().then(()=>{
          res.send(req.body.Player + " joined the room "+ req.body.Name + " as host");
        });
      } else if (!(rooms[0].Player2)){
        rooms[0].Player2 = req.body.Player;
        rooms[0].save().then(()=>{
          res.send(req.body.Player + " joined the room "+ req.body.Name + " as guest");
        });
        
      } else {
        res.send("sala " + req.body.Name + " está cheia");
      }
      
    });
    
});


router.post('/leaveRoom', function(req, res, next) {
  Room.findAll({where:{Name: req.body.Name,
                       GameId: req.body.GameId}}).then(rooms=>{

    if(req.body.Player === rooms[0].Player2){
      rooms[0].Player2 = null;
      rooms[0].save().then(r=>{
        res.send(req.body.Player + " leaved the room " + req.body.Name);
      });
    } else if (req.body.Player == rooms[0].Player1){
      rooms[0].destroy();
      res.send("sala " + req.body.Name + " foi destruida");
    } else {
      res.send(req.body.Player + " nao esta em "+ req.body.Name);
    }

  });
});


router.post('/exists', function(req, res, next) {
  Room.findAll({where:{Name: req.body.Name,
                       GameId: req.body.GameId}}).then(rooms=>{
    console.log(rooms[0]);
    if(rooms[0])
      res.send({exists: true});
    else
      res.send({exists: false});

  });
});





module.exports = router;
