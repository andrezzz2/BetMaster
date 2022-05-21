var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var sequelize = require('./sequelize');
var User = require('./models/User');
var Room = require('./models/Room');
var homeRouter = require('./routes/');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');
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


// BD setup
sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch (error=>{
    console.error('Unable to connect to the database:', error);
})
  
User.sync({ force: true });
Room.sync({ force: true });

module.exports = app;
