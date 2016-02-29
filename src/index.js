import React , { Component , PropTypes } from 'react';
import { Provider as StoreProvider} from 'react-redux';
import store from './store';


export default function App(){
  return (
      <StoreProvider store={store}>
          <div>
            <h1>DX example</h1>
          </div>
      </StoreProvider>
    )
}
