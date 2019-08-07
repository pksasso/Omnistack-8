// Arquivo para lidar com serviços externos, nesse caso comunicação com a API construida no projeto

import axios from 'axios';

const api = axios.create({
  // Define um endereço base de forma que só é necessario mudar o final para receber ou enviar os dados
  baseURL: 'http://localhost:3333'
});

export default api;