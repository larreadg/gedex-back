const Usuario = require('app/models/User');
const Rol = require('app/models/Rol');

// Añade rol_id a la tabla usuario
Rol.hasOne(Usuario);
Usuario.belongsTo(Rol);