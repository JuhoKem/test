const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
//const logger = require('./utils/logger')

// yksinkertainen blogi-sovellus, joka tallentaa tiedot tietokantaan ja hakee ne sieltä.
// Voidaan testata backendin tomivuuttaa kannan kanssa

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})


// 4.1 -4.2