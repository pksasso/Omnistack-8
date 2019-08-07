const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router(); // cria um objeto especifico pra rotas, contido no express

routes.get('/devs', DevController.index); // rota para listar todos os devs cadastrados controlado pelo devController método index

routes.post('/devs', DevController.store); // define uma rota para dar post , controlado pelo DevController método store

routes.post('/devs/:devId/likes', LikeController.store);

routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes; // basicamente faz o return da variavel routes