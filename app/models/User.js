const { Model, DataTypes } = require('sequelize');
const sequelize = require('config/db');
const shajs = require('sha.js')

class Usuario extends Model {
    obtenerNombre() {
        return [this.nombres, this.apellidos].join(' ');
    }
    activo() {
        return this.activo;
    }
    obtenerDocumento() {
        return this.documento;
    }
    obtenerUsuario() {
        return this.usuario;
    }
}

Usuario.init({
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese su/s nombre/s'
            }
        }
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese su/s apellido/s'
            }
        }
    },
    documento: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true
        }
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('clave', shajs('sha256').update(value).digest('hex'));
        }
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'Usuarios',
    modelName: 'usuario'
})


module.exports = Usuario;