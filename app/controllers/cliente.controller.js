const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const Response = require('app/helpers/response');
const { Cliente, ClienteDireccion } = require('app/models/Cliente');

post = async(req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = errors.array().map((el) => { return el.msg });
            let response = new Response(400, { error: err }, "fail");
            return res.status(400).json(response);
        }

        let { nombre, ruc, contacto_email, contacto_telefono, direccion, codigoPostal, ciudad, departamento, pais, latitud, longitud } = req.body;

        const cliente = await Cliente.create({
            nombre,
            ruc,
            contacto_email,
            contacto_telefono
        });

        const clienteDireccion = await ClienteDireccion.create({
            direccion,
            codigoPostal,
            ciudad,
            departamento,
            pais,
            latitud,
            longitud
        });

        await cliente.setClienteDireccion(clienteDireccion);

        let response = new Response(200, cliente, "success");
        res.json(response);


    } catch (e) {
        let response = new Response(500, { error: e.message }, "fail");
        res.status(500).json(response);
    }
}

get = async(req, res) => {
    try {

        let { limit, offset } = req.query;

        const clientes = await Cliente.findAll({
            limit: limit,
            offset: offset,
            attributes: ['id', 'nombre', 'ruc', 'contacto_email', 'contancto_telefono'],
        });

        const total = await Cliente.count();

        let response = new Response(200, clientes, "success", {
            offset: offset,
            limit: limit,
            total: total
        });
        res.json(response);


    } catch (e) {
        let response = new Response(500, { error: e.message }, "fail");
        res.status(500).json(response);
    } 
}

module.exports = {
    post
}