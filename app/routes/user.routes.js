const router = require('express').Router();
const { body } = require('express-validator');
const { register, login } = require('app/controllers/user.controller');

router.post(
    '/register',
    body('usuario').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('clave').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('nombres').not().isEmpty().withMessage('Nombres requerido'),
    body('apellidos').not().isEmpty().withMessage('Apellidos requerido'),
    body('documento').not().isEmpty().trim().escape().withMessage('Documento requerido'),
    register
);
router.post('/login', login);

module.exports = router;