var express = require('express');
var router = express.Router();
const Game = require('../models/Game');


router.post('/add', function(req, res, next) {
    
  Game.findOrCreate({where: {GameId: req.body.GameId},
                     defaults: {Name: req.body.Name,
                                Genre: req.body.Genre,
                                EmbedLink: req.body.EmbedLink,
                                ImageLink: req.body.ImageLink,
                                Difficulty: req.body.Difficulty,
                                Description: req.body.Description }}).then(([game, created])=>{
    if(created){
      const log = "jogo adicionado";
      res.send({accepted: true, log: log});
    } else {
      const error = "jogo já cadastrado";
      res.send({accepted: false, error: error});
    }
  }).catch(error=>{
    console.error(error);
    res.send({accepted: false, error: "Erro no sistemas ao adicionar jogo."});
  });

});


router.post('/getGame', function(req, res, next) {

  Game.findByPk(req.body.GameId).then((game=>{
    if(game)
      res.send({accepted: true, game: game});
    else{
      const error = "Jogo não encontrado";
      res.send({accepted: false, error: error});
    } 
  })).catch(error=>{
    console.error(error);
    res.send({accepted: false, error: "Erro no sistema ao buscar jogo."});
  });

});

router.get('/getGames', function(req, res, next) {

    Game.findAll().then((games=>{
      res.send({accepted: true, List: games});
    })).catch(error=>{
      console.error(error);
      res.send({accepted: false, error: "Erro no sistema ao buscar jogos"});
    });
  
  });



module.exports = router;
