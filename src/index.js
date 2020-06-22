import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

ReactDOM.render(
  <React.StrictMode>
    <Game size={9} />
  </React.StrictMode>,
  document.getElementById('root')
);
