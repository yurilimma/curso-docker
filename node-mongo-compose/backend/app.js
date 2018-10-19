const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

/**
 * diz para a api do mongoose.Promise deverá usar a global.Promisa, 
 * pois a mongoose está deprecated
**/
mongoose.Promise = global.Promise
/**
 * conexão com o mongo, o serviço do banco referenciado no docker-compose.yml
 *  deverá ter o nome "db", porta deful 2717
 */
mongoose.connect('mongodb://db/mydb')

//middlewares
//faz o parser do conteúdo que vem no request
server.use(bodyParser.urlencoded({extented: true}))
server.use(bodyParser.json())
server.use(cors())


//odm
const Client = restful.model('Client', {
    name: { type: String, required: true}
})

//rest api, cria as rotas baseado nos métodos abaixo get, post, put, delete
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

//routes path das rotas. Usa como a raiz da rota /clients
Client.register(server, '/clients')


//startar servidor
server.listen(3000)