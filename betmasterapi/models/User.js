const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    UID:{ type: DataTypes.STRING, primaryKey: true },
    Email: DataTypes.STRING,
    Senha: DataTypes.STRING,
    Moedas: DataTypes.NUMBER,
    PhotoURL: DataTypes.STRING
});

module.exports = User;  