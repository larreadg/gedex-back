require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('app/helpers/jwt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// Rutas
const authRoutes = require('./app/routes/auth.routes');


// Middleware
app.use('/api/user', authRoutes);

app.listen(3000, () => {
    console.log('Server runing');
});