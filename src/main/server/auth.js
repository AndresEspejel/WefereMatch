const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Bienvenido a WefereMarch una API para encontrar Match de textos en Videos de Youtube !!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))   