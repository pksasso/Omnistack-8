const express = require('express'); // express é o framewor web para node, gerencia as requisições e rotas
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); // importa as rotas criadas em outro arquivo

const server = express();// inicializa a server com exepress

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-6zsp4.mongodb.net/oministack8?retryWrites=true&w=majority', {
  useNewUrlParser: true
}); // concecta o server usando express com o banco do mongoDB

// o "use" permite que o express utilize o tipo um módulo nele

server.use(cors()); // permite que o backend da aplicação possa ser usado de qualquer endereço

server.use(express.json()); // configura o express para usar tudo como JSON, precisa estar antes do routes

server.use(routes); // o server com express usa as rotas definidas no arquivo routes

server.listen(3333); // define a porta que sera ouvida como a 3333 (htts://localhost:3333)