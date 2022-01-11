import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { HashRouter } from 'react-router-dom';

const defaultStock = [ 
    { id: 0, name: 'Nice shoes1', quan: 42 },
    { id: 1, name: 'Nice shoes2', quan: 28 },
    { id: 2, name: 'Nice shoes3', quan: 19 },
  ];

function reducer(state = defaultStock, action) {
  if(action.type === 'addStock') {
    const added = [...state];
    const idx = action.payload.id;
    added[idx].quan ++;
    return added;

  } else if(action.type === 'subStock') {
    const subed = [...state];
    const idx = action.payload.id;
    subed[idx].quan --;

    if(subed[idx].quan <= 0) subed.splice(idx, 1);
    return subed;
  
  } else return state;
};


const showAlert = true;

function reducer2(state = showAlert, action) {
  if(action.type === 'hideAlert') {
    state = false;
    return state
  } else return state;
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
