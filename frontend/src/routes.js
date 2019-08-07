import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

// Também é um componente
export default function Routes() {
  return (
    <BrowserRouter>
      {/* Por padrão o reactRouterDOM verifica se o caminho na url começa com o que esta dentro do path, entao "/" e "/main" 
      são a mesma coisa , para verificar se é exatamente igual usa-se o exact após o path */}
      <Route path="/" exact component={Login} />   {/* Quando o caminho for / ele chamará o componente Login */}
      <Route path="/dev/:id" component={Main} /> { /* Quando o caminho for /main ele chamará o componente Main */}
    </BrowserRouter>
  );
}