const express = require('express');
const apiRoutes = require('./api/routes');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (request, response) => {
    response.send(`Hello World`)
})

const errorHandler = (error, req, res, next) => {
    console.log(error.mensage);
    console.log(error.stack);

    res.status(500).json({
        message: 'Ocorreu um erro interno no servidor.',
        error: error.mensage
    })

}

app.use(errorHandler)

module.exports = app;