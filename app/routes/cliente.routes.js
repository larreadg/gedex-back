const router = require('express').Router();
const { body } = require('express-validator');
const { post } = require('app/controllers/cliente.controller');

router.post(
    '/cliente',
    body('nombre').not().isEmpty().withMessage('Nombre requerido'),
    body('ruc').not().isEmpty().withMessage('Ruc requerido'),
    body('contacto_email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('contacto_telefono').not().isEmpty().withMessage('Teléfono requerido'),
    body('direccion').not().isEmpty().withMessage('Dirección requerida'),
    body('ciudad').not().isEmpty().withMessage('Ciudad requerida'),
    body('departamento').not().isEmpty().withMessage('Departamento requerido'),
    body('pais').not().isEmpty().withMessage('País requerido'),
    body('latitud').not().isEmpty().withMessage('Latitud requerida'),
    body('longitud').not().isEmpty().withMessage('Longitud requerida'),
    post
);

module.exports = router;