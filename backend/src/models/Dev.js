const { Schema, model } = require('mongoose');

//Basicamente cria uma classe e vai definindo seus atributos
const DevSchema = new Schema({
  name: { // nome do atributo
    type: String, // tipo do atributo
    required: true, // define se é obrigatório ou não
  },
  user: {
    type: String,
    required: true,
  },
  bio: String, // caso nao seja obrigatório pode colocar direto o tipo após o nome
  avatar: {
    type: String,
    required: true,
  },
  likes: [{ // Um array para conter varios desenvolvedores que deram like
    type: Schema.Types.ObjectId, // tipo referente ao id de retorno do mongoDB
    ref: 'Dev' // o model que será considerado
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dev'
  }],
}, {
    timestamps: true // cria um updatedAt com a data de criação e um updatedAt para quando foi editado
  });

module.exports = model('Dev', DevSchema);// exporta o model (nome do model que sera usado, schema feito aqui)