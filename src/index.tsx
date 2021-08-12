import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {StoreProvider} from './utils/Store'
import { defineCustomElements } from '@ionic/pwa-elements/loader';


ReactDOM.render(
  <React.StrictMode>
   <StoreProvider>
   <App />
   </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

defineCustomElements(window);
