const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const Usuario = require('app/models/User');
const Rol = require('app/models/Rol');
const Response = require('app/helpers/response');

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

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = errors.array().map((el) => { return el.msg });
            let response = new Response(400, { error: err }, "fail");
            return res.status(400).json(response);
        }

        const checkUser = await Usuario.count({
            where: {
                [Op.or]: [{ documento: req.body.documento }, { usuario: req.body.usuario }]
            }
        });
        if (checkUser != 0) {
            let response = new Response(400, { error: "Nro. de documento o correo ya registrado" }, "fail");
            return res.status(400).json(response);
        }

        const rol = await Rol.findOne({ where: { nombre: 'AGENT' } });
        const user = await Usuario.create({...req.body });
        await rol.addUsuario(user);

        let response = new Response(200, { usuario: user.toJSON() }, "success");
        res.json(response);

    } catch (e) {
        let response = new Response(500, { error: e.message }, "fail");
        res.status(500).json(response);
    }


}

omitPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = {
    register,
    login
}