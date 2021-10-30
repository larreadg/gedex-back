const Usuario = require('app/models/User');
const Rol = require('app/models/Rol');
const { Cliente, ClienteDireccion } = require('app/models/Cliente');

// Añade rol_id a la tabla usuario
Rol.hasMany(Usuario, {
    foreignKey: {
        name: 'rol_id'
    }
});
Usuario.belongsTo(Rol, {
    foreignKey: {
        name: 'rol_id'
    }
});

// Cliente
Cliente.hasOne(ClienteDireccion, {
    foreignKey: {
        name: 'cliente_id'
    }
});
ClienteDireccion.belongsTo(Cliente, {
    foreignKey: {
        name: 'cliente_id'
    }
});