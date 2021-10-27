const { Model, DataTypes } = require('sequelize');
const sequelize = require('config/db');

class Rol extends Model {}

Rol.init({
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    tableName: 'Roles',
    modelName: 'rol'
})

// await Rol.sync();

module.exports = Rol;