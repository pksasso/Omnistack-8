import React from 'react';
import './App.css';

import Routes from './routes'; // importa o componente Routes 

// Component App, um componente nada mais é que uma função que retorna um conteudo HTML

function App() {
  return (
    //Aqui será chamado o componente Routes que cuidará de todas as rotas da aplicação
    <Routes /> // para utilizar um componente é só usar como se fosse uma tag html
  );
}

export default App; // exporta o componente App
