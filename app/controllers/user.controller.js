const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const Usuario = require('app/models/User');
const Rol = require('app/models/Rol');
const Response = require('app/helpers/response');
const shajs = require('sha.js');

login = async(req, res) => {

    try {
        const { usuario, clave } = req.body;
        const pwHash = shajs('sha256').update(clave).digest('hex');
        const user = await Usuario.findOne({
            where: {
                [Op.and]: [{ usuario: usuario }, { clave: pwHash }, { activo: true }]
            },
            attributes: ['usuario', 'nombres', 'apellidos', 'documento'],
            include: Rol
        });

        if (!user) {
            let response = new Response(401, { error: "Usuario y/o contraseña incorrectas" }, "fail");
            return res.status(401).json(response);
        }

        const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '1d' });
        let response = new Response(200, { usuario: user.toJSON(), token: token }, "success");
        res.json(response);

    } catch (e) {
        let response = new Response(500, { error: e.message }, "fail");
        res.status(500).json(response);
    }


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


module.exports = {
    register,
    login
}