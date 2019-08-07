import React, { useState } from 'react'; // o useState permite usar estado dentro do react
import './Login.css' // quando o arquivo nao sera utilizado como variavel nao precisa por nome, coloca o caminho direto

import api from '../services/api';

import logo from '../assets/logo.svg'; // importa a logo da pasta assets

/*
Todas as rotas herdam uma propriedade chamada History do reactRouterDom, ele serve para fazer a navegação entre páginas
o history tem um método push, em que é passada a rota da proxima pagina e ele faz a mudança de página
*/

export default function Login({ history }) { // o export default ja exporta o componente assim que ele for renderizado

  const [username, setUsername] = useState(''); // useState retorna dois valores em formato de vetor, o username, que é a variavel,
  // e setUsername, uma função que será utilizada para modificar o valor de username

  async function handleSubmit(e) {
    e.preventDefault(); // Por padrão quando um for é submetido ele redireciona pra uma proxima página, usar o evento.preventDefault() 
    //vai previnir que esse redirecionamento padrão seja feito 

    const response = await api.post('/devs', { // aqui será feito o post pela rota /devs usando a api, é passado um objeto para ser enviado como um json
      username, // poderia ser usado username: username, porém como o campo do objeto é username e o nome da variavel que que recebeu esse valor pelo form
      // também é username pode ser usado uma short sintaxe do ES6 colocando apenas username.
    });

    const { _id } = response.data; // adiciona o id da resposta da API à variavel _id

    console.log(response);

    // É possivel passar parametro para uma rota, então é passado o id recebido da api 
    history.push(`/dev/${_id}`); // Quando o form for submetido e a função rodar o push vai chamar a proxima pagina

  }

  return (
    <div className="login-container"> {/* Em HTML o padrão é usar class, mas como class é uma palavra reservada pelo javaScript usa-se ClassName */}
      <form onSubmit={handleSubmit}> {/* Chama a função handleSubmit quando o form for submetido através do botão */}
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuario do GitHub"
          value={username}
          /* O onChange retorna um evento com campost entao é chamada uma arrow function q chama o setUsername passando o evento.target.value para ele passar o conteudo do evento */
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}