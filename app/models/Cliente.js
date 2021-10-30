const { Model, DataTypes } = require('sequelize');
const sequelize = require('config/db');

class Cliente extends Model {}
class ClienteDireccion extends Model {}

Cliente.init({
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese nombre del cliente'
            }
        }
    },
    ruc: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese ruc'
            }
        }
    },
    contacto_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese email de contacto'
            }
        }
    },
    contacto_telefono: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese teléfono de contacto'
            }
        }
    }
}, {
    sequelize,
    tableName: 'Cliente',
    modelName: 'cliente'
});

ClienteDireccion.init({
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese direccion'
            }
        }
    },
    codigoPostal: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    ciudad: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese ciudad'
            }
        }
    },
    departamento: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese departamento'
            }
        }
    },
    pais: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese departamento'
            }
        }
    },
    latitud: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese latitud'
            }
        }
    },
    longitud: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'Ingrese longitud'
            }
        }
    }
}, {
    sequelize,
    tableName: 'ClienteDireccion',
    modelName: 'clienteDireccion'
});

module.exports = {
    Cliente,
    ClienteDireccion
}