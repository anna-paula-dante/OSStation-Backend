const express = require('express');
const apiRoutes = require('./api/routes');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(express.json())
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

