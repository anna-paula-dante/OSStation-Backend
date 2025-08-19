const express = require('express');
const app = express();
app.use(express.static('build'))

app.get('/', (request, response) => {
    response.send(`Hello World`)
})



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

