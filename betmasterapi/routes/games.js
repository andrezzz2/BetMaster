var express = require('express');
var router = express.Router();
const Game = require('../models/Game');


router.post('/add', function(req, res, next) {
  
  Game.findOrCreate({where: {GameId: req.body.GameId},
                     defaults: {Name: req.body.Name,
                                EmbedLink: req.body.EmbedLink,
                                Difficulty: req.body.Difficulty,
                                Description: req.body.Description }}).then(([game, created])=>{
    if(created){
      res.send(game);
    } else {
      res.send("jogo já cadastrado");
    }
  });

});


router.post('/getGame', function(req, res, next) {

  Game.findByPk(req.body.GameId).then((game=>{
    res.send(game);
  }));

});

router.get('/getGames', function(req, res, next) {

    Game.findAll().then((games=>{
      res.send(games);
    }));
  
  });



module.exports = router;
