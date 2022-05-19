const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Room = sequelize.define('Room', {
    Name: { type: DataTypes.STRING, primaryKey: true },
    GameId: DataTypes.NUMBER,
    Player1: DataTypes.STRING,
    Player2: DataTypes.STRING,
    Bet1: DataTypes.NUMBER,
    Bet2: DataTypes.NUMBER,
    Winner: DataTypes.STRING
});
  
module.exports = Room;  