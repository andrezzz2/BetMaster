const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Game = sequelize.define('Game', {
    GameId: { type: DataTypes.STRING, primaryKey: true },
    Name: DataTypes.STRING,
    Genre: DataTypes.STRING,
    EmbedLink: DataTypes.STRING,
    ImageLink: DataTypes.STRING,
    Difficulty: DataTypes.NUMBER,
    Description: DataTypes.STRING
});
  
module.exports = Game;  