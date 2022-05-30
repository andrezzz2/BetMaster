var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var sequelize = require('./sequelize');
var User = require('./models/User');
var Room = require('./models/Room');
var Game = require('./models/Game');
var homeRouter = require('./routes/');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
var gamesRouter = require('./routes/games');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// routes setup
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/games', gamesRouter);
app.use((error, req, res, next) => {
    console.log('error middleware');
    console.error(error);
    res.sendStatus(500);
});


// BD setup
sequelize.authenticate().then(()=>{
    console.log('Conexão com DB foi estabelecida com sucesso.');
}).catch (error=>{
    console.error('Unable to connect to the database:', error);
})
  
User.sync({ force: true }).then(()=>{
    console.log("Tabela User sincronizada.");
});
Room.sync({ force: true }).then(()=>{
    console.log("Tabela Room sincronizada.");
});
Game.sync({ }).then(()=>{
    console.log("Tabela Game sincronizada.");
});

module.exports = app;
