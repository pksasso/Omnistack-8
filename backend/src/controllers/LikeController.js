const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {

    const { devId } = req.params; // a variavel devId vai receber o que vem como parametro no link da api, é o id de quem receberá o like
    const { user } = req.headers; // quem enviará o like sera pego pelo header

    const loggedDev = await Dev.findById(user); // guarda a instancia do usuario dentro do banco de dados, entao tem acesso a todos os parametros do objeto
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if (targetDev.likes.includes(loggedDev._id)) { // Verifica de um esta na lista de likes do outro pra caracterizar um match
      console.log('MATCH');
    }

    loggedDev.likes.push(targetDev._id);// da push do id do target no array de likes do logged, o push só da pois é um array

    await loggedDev.save();// salva as informações adicionadas no banco de dados

    return res.json(loggedDev);
  }
};