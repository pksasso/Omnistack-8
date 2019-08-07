import React from 'react'; // Importa a biblioteca do react
import ReactDOM from 'react-dom'; // Importa a biblioteca que permite o react lidar com as arvores de elementos

import App from './App';

// Faz com que o reactDOM renderize o arquivo app e coloque na div com id root do arquivo index.html
ReactDOM.render(<App />, document.getElementById('root')); 