import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // pemite criar uma ancora, um link
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg'
import dislike from '../assets/dislike.svg'
//<h1>{match.params.id}</h1> //acessa o parametro id recebido pelo match
export default function Main({ match }) { // o match é um parametro oferecido pelo RouterDOM que te da acesso a todos os parametros enviados pela rota
  // Não pode mexer no users sem usar o setUsers, o unico que sobreescreve ele é essa função
  const [users, setUsers] = useState([]);

  // useEffect é uma função que recebe uma função e uma lista de parametros, sendo q sempre que algum parametro da lista mudar 
  // ela roda novamente com os novos
  useEffect(() => {
    async function loadUsers() {
      // faz a chamada da api enviando o header do usuario logado.
      // só funciona enviar assim pq o segundo parametro do get é o header
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id,
        }
      })
      // seta o estado atual para a lista da resposta, fazendo com que todo o html seja rendeziado novamente com os novos dados
      setUsers(response.data);

    }
    loadUsers();
  }, [match.params.id]);

  //função para lidar com o like
  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    })
    setUsers(users.filter(user => user._id !== id));
  }

  //função para lidar com o like
  async function handleDisike(id) {
    //como o segundo parametro do post é o corpo é necessario mandar null, ja que o corpo é vazio, só entao envia o header
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    })
    // faz um setUser ignorando o id que foi deletado dando dislike, assim a nova lista do setUsers nao tera mais quem recebeu dislike
    // assim não é necessario dar F5 pois o setUsers ja rebuilda a pagina
    setUsers(users.filter(user => user._id !== id));

  }

  return (
    <div className="main-container">
      <Link to="/"> {/* Quando clicar na imagem o link q redirecionar pra rota / */}
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {/* cria um map de users e percorre ele gerando um li para cada */}
          {users.map(user => (
            <li key={user._id}> {/* a key ajuda o react a rebuildar a lista, do contrario toda vez ele iria renderizar tudo do zero */}
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDisike(user._id)}> {/* Se nao fizer a arrow function quando o react renderizar esse botao ele ja vai rodar a função mesmo que nao tenha sido clicada*/}
                  <img src={dislike} alt="dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <div className='empty'>
            Acabou :(
        </div>
        )}
    </div>
  );
}