const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('app/models/User');
const Rol = require('app/models/Rol');

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

login = (req, res) => {

    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ "message": "Usuario y/o contraseña incorrectas" });
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '1d' });
    res.json({
        ...omitPassword(user),
        token
    });
}

register = async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const rol = await Rol.findOne({ where: { nombre: 'AGENT' } });
    const user = await Usuario.create({...req.body, rolId: rol.id });

    res.json({ "estado": 0, "usuario": user.toJSON() });

}

omitPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = {
    register,
    login
}