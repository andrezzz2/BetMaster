var express = require('express');
var router = express.Router();
const Room = require('../models/Room');
const { Op } = require('sequelize');       


var jogadorEmSala = {};

async function conexaoAtiva(Name, GameId, UID, Host){
  
  const limite = 3;
  let contador = 0;
  const id = setInterval(function(){

    console.log("waiting for user ", UID, " response... ", contador);

    if(contador==limite){

      //Tratamento para usuarios com tempo limite de resposta esgotado
      console.log("tempo esgotado!");
      if(Host){
        //Excluir sala se for host
        console.log("Conexão perdida com host");
        console.log("Excluindo sala ", Name);
        Room.findAll({where:{Name: Name,
                             GameId: GameId}}).then(rooms=>{
          if(rooms[0])
          rooms[0].destroy();
        });
      } else { 
        //Tirar apenas player2 se não for host
        console.log("Conexão perdida com guest");
        
        Room.findAll({where:{Name: Name,
                             GameId: GameId}}).then(rooms=>{
          if(rooms[0]){
            rooms[0].Player2 = null;
            rooms[0].save(()=>{
              console.log("Guest ", Name, " removido da sala.");
            });
          }
        }); 
      }

      clearInterval(id);

    } else if(jogadorEmSala[UID] == true){

      console.log("jogador - ", UID , " está ativo");
      contador = 0;
      jogadorEmSala[UID] = false;

    }
    contador+=1;

  }, 1000);

}





router.post('/getAllRooms', function(req, res, next) {

  console.log("Pedido da lista de salas do jogo #", req.body.GameId);
  Room.findAll({where: {GameId: req.body.GameId }}).then((rooms)=>{
    
    const log = "Lista atualizada";
    res.send({accepted: true, log: log, List: rooms});

  }).catch(error=>{

    console.error(error);
    res.send({accepted: false, error: "Erro no sistema ao buscar salas"});
  
  });

});





router.post('/createRoom', function(req, res, next) {

  console.log("Tentando criar sala ", req.body.Name);
  Room.findOrCreate({where:{Name: req.body.Name},
                     defaults:{GameId: req.body.GameId} }).then(([room, created])=>{
    
    if (created){
        const log = "Sala " + room.Name + " criada com sucesso";
        console.log(log);
        res.send({accepted: true, log: log});
    } else {
      res.send({accepted: false, error: "Esta sala já existe"});
    }

  }).catch(error=>{
    
    console.error(error);
    res.send({accepted: false, error: "Erro no sistema ao criar sala"});

  });

});


router.post('/getRooms', function(req, res, next) {

  //ver se Name contem o req.body.Name
  Room.findAll({where: {Name: { [Op.substring]: "%"+req.body.Name+"%" }, GameId: req.body.GameId}}).then((rooms)=>{
    
    res.send({accepted: true, List: rooms});

  }).catch(error=>{

    console.error(error);
    res.send({accepted: false, error: "Erro no sistema ao buscar salas"});

  });

});

router.post('/joinRoom', function(req, res, next) {

    Room.findAll({where:{Name: req.body.Name,
                         GameId: req.body.GameId}}).then(rooms=>{
      //verificando se sala existe
      if(rooms[0]){

        if (!(rooms[0].Player1)){
          rooms[0].Player1 = req.body.Player;
          rooms[0].save().then((room)=>{
            //chamada de funçao para ficar checando se player esta na sala
            conexaoAtiva(room.Name, room.GameId, room.Player1, true);
  
            //resposta da api
            console.log(room.Player1 + " joined the room "+ room.Name + " as host");
            const log = "You joined the room " + room.Name + " as host";
            res.send({accepted: true, log: log});
          });
        } else if (!(rooms[0].Player2)){
          rooms[0].Player2 = req.body.Player;
          rooms[0].save().then((room)=>{
            //chamada de funçao para ficar checando se player esta na sala
            conexaoAtiva(room.Name, room.GameId, room.Player2, false);
  
            //resposta da api
            console.log(room.Player2 + " joined the room "+ room.Name + " as guest")
            const log = "You joined the room "+ req.body.Name + " as guest";
            res.send({accepted: true, log: log});
          });
          
        } else {
          const error = "sala " + req.body.Name + " está cheia"
          res.send({accepted: false, error: error});
        }

      } else {

        const error = "Sala " + req.body.Name + " não existe";
        res.send({accepted: false, error: error});

      }
      
    }).catch(error=>{
      console.error(error);
      res.send({accepted: false, error: "Falha ao buscar sala no sistema"});
    });
    
});

/*
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
      res.send(req.body.Player + " nao esta em " + req.body.Name);
    }

  });
});
*/


router.post('/connectRoom', function(req, res, next) {

  console.log("Usuário ", req.body.UID, " pedindo conexão com sala ", req.body.Name ,".");
  Room.findAll({where:{Name: req.body.Name,
                       GameId: req.body.GameId}}).then(rooms=>{
    if(rooms[0]){

      if(rooms[0].Player1 == req.body.UID || rooms[0].Player2 == req.body.UID){
        
        jogadorEmSala[req.body.UID] = true;
        const log = "Conexão aceita";
        res.send({accepted: true, log: log});

      } else {

        const error = "Tentando conexão com sala diferente da selecionada.";
        res.send({accepted: false, error: error});

      }
      
    } else{
      res.send({accepted: false, error: "Sala não existe."});
    }

  }).catch(error=>{
    console.error(error);
    res.send({accepted: false, error: "Falha no sistema ao buscar sala."})
  });

});



module.exports = router;
