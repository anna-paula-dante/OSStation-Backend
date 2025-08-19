const express = require('express');
const apiRoutes = require('./api/routes');


const app = express();
const PORT = 3001;

app.use('/api', apiRoutes);

app.get('/', (request, response) => {
    response.send(`Hello World`)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

