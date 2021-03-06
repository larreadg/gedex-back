require('rootpath')();
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const jwt = require('app/helpers/jwt');
const sequelize = require('config/db');
require('config/associations');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

// Rutas
const authRoutes = require('app/routes/user.routes');
const clienteRoutes = require('app/routes/cliente.routes');


// Middleware
// app.use('/api/user', authRoutes);
app.use('/api', clienteRoutes);

app.listen(3000, () => {
    console.log('Server runing');

    sequelize.sync({ force: true }).then(() => {
        console.log('Database connected');
    }).catch(err => console.log('Connection refused'));
});