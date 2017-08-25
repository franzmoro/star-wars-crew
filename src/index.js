import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { store } from './app';
import CharactersList from './characters/components/CharactersList';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Provider store={store}>
    <CharactersList />
  </Provider>,
  root
);
