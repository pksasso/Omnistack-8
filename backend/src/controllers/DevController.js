const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({ // retorna uma lista de todos os usuarios que ainda nao interagiram com voce, tem q ser diferente de voce, nas estar na lista  de likes e nem de dislikes
      $and: [ // $and define que todas as condições definidas devem passar
        { _id: { $ne: user } }, // $ne é not equal, primeiro filtro para o usuario nao aparecer nele mesmo 
        { _id: { $nin: loggedDev.likes } }, // $nin é not in, não mostra caso ele esteja na lista de likes
        { _id: { $nin: loggedDev.dislikes } } // não mostra caso esteja na lista de dislikes
      ],
    })

    return res.json(users);

  },

  async store(req, res) {

    const { username } = req.body; // define uma variavel username para receber o que vem com o request

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`); // recebe os dados da API do github usando o nome mandado via request

    const { name, bio, avatar_url/*NOME DO CAMPO NO RESPONSE*/: avatar/*NOME QUE EU QUERO USAR*/ } = response.data; // atribuição via desestruturação, busca no objeto os campos pedidos e faz a atribuição

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar: avatar
    });//Cria um objeto do tipo deve e preenche ele com os campos retornados pela API guardados pela atribuição

    return res.json(dev); // Retorna em JSON o objeto criado na variavel dev
  }
};